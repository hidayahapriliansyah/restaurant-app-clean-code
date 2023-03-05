import RestaurantData from '../../data/restaurant-data';
import urlParser from '../../routes/url-parser';
import {
  createDetailImgRating,
  createDetailInfo,
} from '../templates/template-creator';

const Detail = {
  async render() {
    return `
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
      <h3>Customer Review</h3>
      <div class="detail__reviews-group__content">

      </div>
      <div class="detail__review-more">
        <a href="#">Lihat selengkapnya</a>
      </div>
    </div>
    `;
  },

  async afterRender() {
    const url = urlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantData.detailRestaurant(url.id);
    console.log(restaurant);

    const imgRating = document.querySelector('.img-rating');
    imgRating.innerHTML = createDetailImgRating(restaurant);

    const detailInfo = document.querySelector('.detail__info');
    detailInfo.innerHTML = createDetailInfo(restaurant);
  },
};

export default Detail;
