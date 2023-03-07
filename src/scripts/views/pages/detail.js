import RestaurantData from '../../data/restaurant-data';
import urlParser from '../../routes/url-parser';
import FavoriteButtonInitiator from '../../utils/favorite-button-initiator';
import AddReviewInitiator from '../../utils/add-review-initiator';
import {
  createDetailImgRating,
  createDetailInfo,
  createListMenuMakanan,
  createListMenuMinuman,
  createReviewContentCard,
} from '../templates/template-creator';

const Detail = {
  async render() {
    return `
    <div class="loader-container">
      <span class="loader"></span>
    </div>
    <div class="detail__container">
      <div class="img-detail__info">
        <div class="img-rating">
        </div>
        <div class="detail__info">
        
        </div>
      </div>
      <div class="detail__menu">
        <h3>Menu</h3>
        <div class="detail__menu-makanan">

        </div>
        <div class="detail__menu-minuman">

        </div>
      </div>
    
      <div class="detail__reviews-group">
        <div class="detail__reviews-add">

        </div>
        <h3><span></span> Customer Review</h3>
        <div class="detail__reviews-group__content">

        </div>
        <div class="detail__review-more">

        </div>
      </div>
    </div>

    <div id="favorite-button-container">

    </div>
    `;
  },

  async afterRender() {
    const url = urlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantData.detailRestaurant(url.id);

    const imgRating = document.querySelector('.img-rating');
    imgRating.innerHTML = createDetailImgRating(restaurant);

    const detailInfo = document.querySelector('.detail__info');
    detailInfo.innerHTML = createDetailInfo(restaurant);

    const { foods, drinks } = restaurant.menus;
    const menuMakanan = document.querySelector('.detail__menu-makanan');
    menuMakanan.innerHTML = createListMenuMakanan(foods);

    const menuMinuman = document.querySelector('.detail__menu-minuman');
    menuMinuman.innerHTML = createListMenuMinuman(drinks);

    const { customerReviews: reviews } = restaurant;
    const customerReviewsCount = document.querySelector('.detail__reviews-group h3 span');
    customerReviewsCount.innerHTML = reviews.length;

    const reviewsContainer = document.querySelector('.detail__reviews-group__content');
    reviewsContainer.innerHTML = createReviewContentCard(reviews.reverse());

    if (reviews.length > 3) {
      const moreReviewContainer = document.querySelector('.detail__review-more');
      moreReviewContainer.innerHTML = `<a href="#/reviews/${restaurant.id}">Lihat ${reviews.length - 3} review lainnya</a>`;
    }

    FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favorite-button-container'),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        pictureId: restaurant.pictureId,
        city: restaurant.city,
        rating: restaurant.rating,
        description: restaurant.description,
      },
    });

    AddReviewInitiator.init({
      addReviewContainer: document.querySelector('.detail__reviews-add'),
      restaurantId: restaurant.id,
      customerReviewsCount,
      reviewsContainer,
    });

    const loaderContainer = document.querySelector('.loader-container');
    loaderContainer.remove();
  },
};

export default Detail;
