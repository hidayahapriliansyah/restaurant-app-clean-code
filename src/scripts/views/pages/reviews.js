import UrlParser from '../../routes/url-parser';
import RestaurantData from '../../data/restaurant-data';
import { createReviewContentCard } from '../templates/template-creator';

const Reviews = {
  async render() {
    return `
      <div class="reviews__container">
        <h3>Review Restaurant <span></span></h3>
        <div class="reviews__container-card">

        </div>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantData.detailRestaurant(url.id);
    const { customerReviews: reviews } = restaurant;

    const restaurantName = document.querySelector('.reviews__container h3 span');
    restaurantName.innerHTML = restaurant.name;

    const reviewsContainerCard = document.querySelector('.reviews__container-card');
    reviewsContainerCard.innerHTML = createReviewContentCard(reviews, 'all');
    console.log(reviews);
  },
};

export default Reviews;
