import UrlParser from '../../routes/url-parser';
import RestaurantData from '../../data/restaurant-data';
import { createReviewContentCard, createDetailImgRating } from '../templates/template-creator';

const Reviews = {
  async render() {
    return `
      <div class="loader-container">
        <span class="loader"></span>
      </div>
      <div class="reviews__container">
        <h2>Review Restaurant <span></span></h2>
        <div class="img-rating">

        </div>
        <div class="reviews__container-card">

        </div>
      </div>
    `;
  },

  async afterRender() {
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurant = await RestaurantData.detailRestaurant(url.id);
      if (restaurant instanceof Error) {
        throw restaurant;
      }
      const { customerReviews: reviews } = restaurant;

      const restaurantName = document.querySelector('.reviews__container h2 span');
      restaurantName.innerHTML = restaurant.name;

      const imgRating = document.querySelector('.img-rating');
      imgRating.innerHTML = createDetailImgRating(restaurant);

      const reviewsContainerCard = document.querySelector('.reviews__container-card');
      reviewsContainerCard.innerHTML = createReviewContentCard(reviews.reverse(), 'all');

      const loaderContainer = document.querySelector('.loader-container');
      loaderContainer.remove();
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        error.message += ': Terjadi masalah koneksi internet';
      }
      // eslint-disable-next-line no-alert
      alert(error.message);
    }
  },
};

export default Reviews;
