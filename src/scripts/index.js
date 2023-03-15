import App from './views/app';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import './components/loader-content';

import '../styles/content.css';
import '../styles/main.css';
import '../styles/navbar.css';
import '../styles/detail.css';
import '../styles/reviews.css';
import '../styles/favorite.css';
import '../styles/loader.css';

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
  swRegister();
});
