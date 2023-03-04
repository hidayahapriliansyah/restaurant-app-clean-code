const excerpDescription = (description) => (
  description.split('').slice(0, 65).join('')
);

const createRestaurantCards = (restaurant) => `
  <div id="${restaurant.id}" class="card">
    <img src="${restaurant.pictureId}" alt="${restaurant.name}">
    <div class="city"><h4>${restaurant.city}</h4></div>
    <div class="detail">
      <p class="rating">Rating : ${restaurant.rating}</p>
        <h3 class="restaurant-name">
          <a href="#">
            ${restaurant.name}
          </a>
        </h3>
      <p class="description">${excerpDescription(restaurant.description)} <a href="#" class="full-info">...Lihat Selengkapnya</a></p>
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

export {
  createRestaurantCards,
  createHitsFood,
};
