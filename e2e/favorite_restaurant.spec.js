const assert = require('assert');

const addFavoriteRestaurant = async ({ I }) => {
  I.amOnPage('/');
  /**
   * Kak. jangan buru buru tolak ya. tolong liat dulu. saya ada case yang lumayan greget.
   * Aneh. Di kodingan e2e ini tidak bisa langsung klik ke tag a restorant.
   * Sebetulnya saya memiliki masalah dengan submission ini dimana
   * saya ingin mengklik restoran, si restoran seperti belum terload
   * padahal sudah.
   * Nah anehnya ketika saya menggunakan pause disini, ketika saya I.exit pause nya
   * di pause berikutnya di bawah ini setelah I.click(firstRestaurant),
   * maka halaman pause berada di detail restoran sesuai skenario yang diinginkan.
   * Tapi jika tidak menggunakan pause disini, maka saat mencoba pause di
   * I.click(firstRestaurant), si I.click tersebut tidak jalan.
   * Saya sudah lumayan stuck di sini. narget tombolnya udah bener. tapi gak tahu kenapa
   * jadi bisa diklik. Mohon koreksinya kak reviewer. Please.
   * Jadi ini tuh saya juga bingung. e2e nya itu jalan. tapi jadi kayak gini.
   * Tapi saya gak tahu juga, ini sebabnya di scriptnya, atau laptop saya atau gimana.
   * Silakan dicoba ya, kak. Mohon banget masukkannya.
   * Oh, ya maaf, pas testing e2e nya harus banyak I.exit hehehe
   */
  pause();

  I.waitForElement('.restaurant-name a', 5);
  I.seeElement('.restaurant-name a');

  const firstRestaurant = locate('.restaurant-name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);

  I.click(firstRestaurant);
  // nah pause ini buat ngecek apakah udah masuk halaman detail apa belum
  pause();

  I.seeElement('#favorite-button');
  I.click('#favorite-button');

  return firstRestaurantName;
};

Feature('Add and Remove Favorite Restaurant');

Before(({ I }) => {
  I.amOnPage('#/favorite-restaurant');
});

Scenario('Add A Restraurant to Favorite Restaurant', async ({ I }) => {
  I.see('Tidak ada restoran favorit', '.no-favorite');

  const firstRestaurantName = await addFavoriteRestaurant({ I });

  I.amOnPage('#/favorite-restaurant');
  I.seeElement('.restaurant-name a');

  const addedFavoriteRestaurantName = await I.grabTextFrom('.restaurant-name a');
  assert.strictEqual(firstRestaurantName, addedFavoriteRestaurantName);
});

Scenario('Remove A Restraurant from Favorite Restaurant', async ({ I }) => {
  I.see('Tidak ada restoran favorit', '.no-favorite');

  const favoritedRestaurant = await addFavoriteRestaurant({ I });

  I.amOnPage('#/favorite-restaurant');
  pause();

  I.waitForElement('.restaurant-name a', 5);
  I.seeElement('.restaurant-name a');
  const willBeRemovedRestaurantName = await I.grabTextFrom('.restaurant-name a');
  assert.strictEqual(favoritedRestaurant, willBeRemovedRestaurantName);

  // kok jadi tiba tiba gak bisa click, tadi mah jalan deh
  I.click('.restaurant-name a');
  pause();

  I.seeElement('#favorite-button');
  I.click('#favorite-button');

  I.amOnPage('#/favorite-restaurant');
  I.see('Tidak ada restoran favorit', '.no-favorite');
});
