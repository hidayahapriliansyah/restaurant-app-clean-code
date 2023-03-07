import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantCards } from '../templates/template-creator';

const FavoriteRestaurant = {
  async render() {
    return `
      <div class="loader-container">
        <span class="loader"></span>
      </div>
      <section class="favorite__restaurant">
        <h2>Favorite Restaurant</h2>
        <div class="card-group">
        
        </div>
      </section>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    const favoriteCardGroup = document.querySelector('.card-group');

    restaurants.forEach((restaurant) => {
      favoriteCardGroup.innerHTML += createRestaurantCards(restaurant);
    });

    const loaderContainer = document.querySelector('.loader-container');
    loaderContainer.remove();
  },
};

export default FavoriteRestaurant;
