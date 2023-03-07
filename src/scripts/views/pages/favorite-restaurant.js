import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantCards } from '../templates/template-creator';

const FavoriteRestaurant = {
  async render() {
    return `
      <loader-content></loader-content>
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

    const loaderContent = document.querySelector('loader-content');
    loaderContent.remove();
  },
};

export default FavoriteRestaurant;
