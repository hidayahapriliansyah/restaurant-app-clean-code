import App from './views/app';

import '../styles/content.css';
import '../styles/main.css';
import '../styles/navbar.css';
import '../styles/detail.css';
import '../styles/reviews.css';

const app = new App({
  hamburger: document.querySelector('.burger'),
  drawer: document.querySelector('.menu'),
  content: document.querySelector('.content'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});

console.log('Hello World Adididididi');
