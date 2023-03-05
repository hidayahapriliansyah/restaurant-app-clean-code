import data from '../../DATA.json';

const { restaurants } = data;

const restaurantsCardGroup = document.querySelector('.explore .card-group');

const excerpDescription = (description) => (
  description.split('').slice(0, 65).join('')
);

restaurantsCardGroup.innerHTML = restaurants.map((restaurant) => (
  `<div id="${restaurant.id}" class="card">
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
  </div>`
)).join('');

export default restaurantsCardGroup;
