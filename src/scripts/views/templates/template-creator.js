const excerpDescription = (description) => (
  description.split('').slice(0, 65).join('')
);

const createRestaurantCards = (restaurant) => `
  <div id="${restaurant.id}" class="card">
    <img src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" alt="${restaurant.name}">
    <div class="city"><h4>${restaurant.city}</h4></div>
    <div class="detail">
      <p class="rating">Rating : ${restaurant.rating}</p>
        <h3 class="restaurant-name">
          <a href="#/detail/${restaurant.id}">
            ${restaurant.name}
          </a>
        </h3>
      <p class="description">${excerpDescription(restaurant.description)} <a href="#/detail/${restaurant.id}" class="full-info">...Lihat Selengkapnya</a></p>
    </div>
  </div>`;

const createHitsFood = (food) => `
  <div id="${food.id}" class="card-hits">
  <a href="#" id="" class="card-hits">
    <img src="${food.picture}" alt="${food.name}">
    <div class="detail">
      <h3 class="restaurant-name">${food.name}</h3>
    </div>
  </a>
  </div>
`;

const createDetailImgRating = (restaurant) => `
  <div class="img-detail">
  <img src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" alt="dummy">
  </div>
  <span class="detail__rating">
    Rating <span clas="rating">${restaurant.rating}</span>
  <span style="color: yellow">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>
  </span>
  </span>
`;

const createDetailInfo = (restaurant) => `
  <h2>${restaurant.name}</h2>
  <span class="detail__info-category">Category :
    <span>
    ${restaurant.categories.map((category) => `
      <a href="#">${category.name}</a>
    `).join('')}
    </span>
  </span>
  <span class="detail__info-alamat">Alamat : <span>${restaurant.address}</span></span>
  <span class="detail__info-kota">Kota : <span>${restaurant.city}</span></span>
  <span class="detail__info-deskripsi">
    <span>Deskripsi</span>
    <p>${restaurant.description}</p>
  </span>
`;

const createListMenuMakanan = (restaurant) => `
  <h4>Makanan</h4>
  <ul>
    ${restaurant.menus.foods.map((food) => `
      <li>${food}</li>
    `).join('')}
  </ul>
`;

const createListMenuMinuman = (restaurant) => `
  <h4>Minuma</h4>
  <ul>
    ${restaurant.menus.drinks.map((drink) => `
      <li>${drink}</li>
    `).join('')}
  </ul>
`;

const createReviewContentCard = (restaurant) => {
  const reviews = restaurant.customerReviews;
  reviews.map((review) => `
    <div class="detail__review">
      <p class="detail__review-name">${review.name}</p>
      <span class="detail__review-review">${review.review}</span>
      <p class="detail__review-date">${review.date}</p>
    </div>
  `).join('');
};

export {
  createRestaurantCards,
  createHitsFood,
  createDetailImgRating,
  createDetailInfo,
  createListMenuMakanan,
  createListMenuMinuman,
  createReviewContentCard,
};
