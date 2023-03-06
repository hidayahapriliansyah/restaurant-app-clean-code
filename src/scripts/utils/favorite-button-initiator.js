import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';
import { createFavoriteButtonTemplate, createFavoritedButtonTemplate } from '../views/templates/template-creator';

const FavoriteButtonInitiator = {
  async init({ favoriteButtonContainer, restaurant }) {
    this._favoriteButtonContianer = favoriteButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderFavorited();
    } else {
      this._renderFavorite();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },

  _renderFavorite() {
    this._favoriteButtonContianer.innerHTML = createFavoriteButtonTemplate();

    const favoriteButton = document.querySelector('#favorite-button');
    favoriteButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
      this._renderButton();
      // eslint-disable-next-line no-alert
      alert(`${this._restaurant.name} ditambahkan ke Favorite`);
    });
  },

  _renderFavorited() {
    this._favoriteButtonContianer.innerHTML = createFavoritedButtonTemplate();

    const favoriteButton = document.querySelector('#favorite-button');
    favoriteButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
      this._renderButton();
      // eslint-disable-next-line no-alert
      window.alert(`${this._restaurant.name} dihapus dari Favorite`);
    });
  },
};

export default FavoriteButtonInitiator;
