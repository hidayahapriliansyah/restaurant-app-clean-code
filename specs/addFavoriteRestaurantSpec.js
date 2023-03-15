import FavoriteButtonInitiator from '../src/scripts/utils/favorite-button-initiator';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Add A Favorite Restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div id="favorite-button-container"></div>';
  };

  beforeEach(() => {
    addFavoriteButtonContainer();
  });

  it('shold show the favorite button when the restaurant has not been favorited before', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favorite-button-container'),
      restaurant: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="Tambahkan ke favorit restaurant"]'))
      .toBeTruthy();
  });

  it('shold not show the remove favorite button when the restaurant has not been favorited before', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favorite-button-container'),
      restaurant: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="Hapus dari favorit restaurant"]'))
      .toBeFalsy();
  });

  it('should be able to add to favorite restauran', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favorite-button-container'),
      restaurant: {
        id: 1,
        name: 'Contoh Restaurant',
      },
    });

    document.querySelector('#favorite-button').dispatchEvent(new Event('click'));

    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1, name: 'Contoh Restaurant' });

    FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add to favorite when it is already added', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favorite-button-container'),
      restaurant: {
        id: 1,
        name: 'Contoh Restaurant',
      },
    });

    await FavoriteRestaurantIdb.putRestaurant({ id: 1, name: 'Contoh Restaurant' });

    document.querySelector('#favorite-button').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurant())
      .toEqual([{
        id: 1,
        name: 'Contoh Restaurant',
      }]);

    FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add to favorite restaurant when it has no id', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favorite-button-container'),
      restaurant: {
        name: 'Contoh Restaurant',
      },
    });

    document.querySelector('#favorite-button').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurant())
      .toEqual([]);
  });
});
