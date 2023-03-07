import data from '../../../DATA.json';
import { createRestaurantCards, createHitsFood } from '../templates/template-creator';
import RestaurantData from '../../data/restaurant-data';

const { hitFoods } = data;

const Home = {
  async render() {
    return `
      <div class="loader-container">
        <span class="loader"></span>
      </div>
      <section class="hero">
        <img src="./images/heros/hero-image_2.jpg"  alt="Kegiatan makan bersama" class="img-hero">
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
    const restaurants = await RestaurantData.listAll();
    const restaurantCardGroupContainer = document.querySelector('.explore .card-group');
    restaurants.forEach((restaurant) => {
      restaurantCardGroupContainer.innerHTML += createRestaurantCards(restaurant);
    });

    const hitsFoodCarGroupContainer = document.querySelector('.hits .card-group');
    hitFoods.forEach((food) => {
      hitsFoodCarGroupContainer.innerHTML += createHitsFood(food);
    });

    const loaderContainer = document.querySelector('.loader-container');
    loaderContainer.remove();
  },
};

export default Home;
