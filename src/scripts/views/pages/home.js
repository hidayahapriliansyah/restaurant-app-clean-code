import data from '../../data/DATA.json';
import {
  createRestaurantCards,
  createHitsFood,
} from '../templates/template-creator';
import RestaurantData from '../../data/restaurant-data';

const Home = {
  async render() {
    return `
      <loader-content></loader-content>
      <section class="hero">
      <picture>
        <source media="(max-width: 600px)" srcset="./images/heros/hero-image_2-small.jpg">
        <img src="./images/heros/hero-image_2-large.jpg"  alt="Kegiatan makan bersama" class="img-hero" width="786" height="500">
      </picture>
        <div class="hero-tagline">
          <div class="tagline">
            <h1>Botram</h1>
            <p>Apapun makanannya, kalau makan bareng, makan makin enak!</p>
          </div>
        </div>
      </section>
      <section class="explore">
        <h2>Explore Restaurant</h2>
        <div class="card-group">
          
        </div>
      </section>
      <section class="hits">
        <h2>Hit Foods!</h2>
        <div class="card-group">

        </div>
      </section>
    `;
  },

  async afterRender() {
    try {
      const restaurants = await RestaurantData.listAll();
      const restaurantCardGroupContainer = document.querySelector('.explore .card-group');
      restaurants.forEach((restaurant) => {
        restaurantCardGroupContainer.innerHTML += createRestaurantCards(restaurant);
      });

      // TODO nanti aktifkan ya sayang
      const hitsFoodCarGroupContainer = document.querySelector('.hits .card-group');
      data.hitFoods.forEach((food) => {
        hitsFoodCarGroupContainer.innerHTML += createHitsFood(food);
      });

      const loaderContent = document.querySelector('loader-content');
      loaderContent.remove();
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        error.message += ': Terjadi masalah koneksi internet';
      }
      // eslint-disable-next-line no-alert
      alert(error.message);
    }
  },
};

export default Home;
