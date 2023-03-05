import data from '../../DATA.json';

const { hitFoods } = data;

const hitsCardGroup = document.querySelector('.hits .card-group');

hitsCardGroup.innerHTML = hitFoods.map((food) => (
  `<div id="${food.id}" class="card-hits">
  <a href="#" id="" class="card-hits">
    <img src="${food.picture}" alt="${food.name}">
    <div class="detail">
      <h3 class="restaurant-name">${food.name}</h3>
    </div>
  </a>
  </div>`
)).join('');

export default hitsCardGroup;
