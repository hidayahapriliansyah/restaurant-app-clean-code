import CONFIG from '../globals/config';
import RestaurantData from '../data/restaurant-data';
import { createReviewContentCard } from '../views/templates/template-creator';

const AddReviewInitiator = {
  init({
    addReviewContainer,
    restaurantId,
    customerReviewsCount,
    reviewsContainer,
  }) {
    this._addReviewContainer = addReviewContainer;
    this._restaurantId = restaurantId;
    this._customerReviewsCount = customerReviewsCount;
    this._reviewsContainer = reviewsContainer;

    this._renderAddReview();
    this._reviewSender();
  },

  _renderAddReview() {
    this._addReviewContainer.innerHTML = `
    <div class="reviews__add">
      <form>
        <span><p>Tambah Review</p></span>
        <div>
          <input type="text" id="review-name" placeholder="Nama" aria-label="Nama reviewer" required>
        </div>
        <div>
          <textarea type="text" id="review-body" placeholder="Review" aria-label="Isi review" required></textarea>
        </div>
        <button type="submit" id="review-submit" aria-label="Kirim review" data-doc=${this._restaurantId}>Kirim!</button>
      </form>
    </div>
    `;
  },

  _reviewSender() {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.querySelector('#review-name');
      const reviewInput = document.querySelector('#review-body');
      const btnSubmit = document.querySelector('#review-submit');

      const name = nameInput.value;
      const review = reviewInput.value;
      const restaurantId = btnSubmit.dataset.doc;
      const payload = {
        id: restaurantId,
        name,
        review,
      };

      btnSubmit.innerHTML = '<div class="button-loader-container"><span class="button-loader"></span><div>';
      const reviews = await fetch(`${CONFIG.BASE_URL}review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log(reviews);
      await this._renderReviewList();
      nameInput.value = '';
      reviewInput.value = '';
      // eslint-disable-next-line no-alert
      alert(`Review dari ${name} telah ditambahkan!`);
      btnSubmit.innerHTML = 'Kirim!';
    });
  },

  async _renderReviewList() {
    const restaurant = await RestaurantData.detailRestaurant(this._restaurantId);
    const { customerReviews: reviews } = restaurant;

    this._customerReviewsCount.innerHTML = reviews.length;
    this._reviewsContainer.innerHTML = createReviewContentCard(reviews.reverse());
    console.log('innerHtml', this._reviewsContainer.innerHTML);

    if (reviews.length > 3) {
      const moreReviewContainer = document.querySelector('.detail__review-more');
      moreReviewContainer.innerHTML = `<a href="#/reviews/${restaurant.id}">Lihat ${reviews.length - 3} review lainnya</a>`;
    }
  },
};

export default AddReviewInitiator;
