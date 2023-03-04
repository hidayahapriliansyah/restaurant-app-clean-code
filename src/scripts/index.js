import App from './views/app';

import '../styles/content.css';
import '../styles/main.css';
import '../styles/navbar.css';

const app = new App({
  hamburger: document.querySelector('.burger'),
  drawer: document.querySelector('.menu'),
  content: document.querySelector('.content'),
});

console.log('Hello World Adididididi');
