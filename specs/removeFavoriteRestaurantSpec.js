import FavoriteButtonInitiator from '../src/scripts/utils/favorite-button-initiator';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Remove Favorite Restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div id="favorite-button-container"></div>';
  };

  beforeEach(async () => {
    addFavoriteButtonContainer();
    await FavoriteRestaurantIdb.putRestaurant({
      id: 1,
      name: 'Contoh Restaurant',
    });
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('shold show the remove favorite button when the restaurant has not been favorited before', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favorite-button-container'),
      restaurant: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="Hapus dari favorit restaurant"]'))
      .toBeTruthy();
  });

  it('shold not show the add favorite button when the restaurant has not been favorited before', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favorite-button-container'),
      restaurant: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="Tambahkan ke favorit restaurant"]'))
      .toBeFalsy();
  });

  it('should be able to remove from favorite restauran', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favorite-button-container'),
      restaurant: {
        id: 1,
        name: 'Contoh Restaurant',
      },
    });

    document.querySelector('#favorite-button').dispatchEvent(new Event('click'));

    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    expect(restaurants).toEqual([]);
  });

  it('should not throw error if favorite restaurant is not in the list', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favorite-button-container'),
      restaurant: {
        id: 1,
        name: 'Contoh Restaurant',
      },
    });

    await FavoriteRestaurantIdb.deleteRestaurant(1);

    document.querySelector('#favorite-button').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurant())
      .toEqual([]);
  });
});
