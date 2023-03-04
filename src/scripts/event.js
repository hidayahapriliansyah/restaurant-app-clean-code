const burger = document.querySelector('.burger');
burger.addEventListener('click', () => {
  const menu = document.querySelector('.menu');
  burger.classList.toggle('x');
  menu.classList.toggle('active');
})