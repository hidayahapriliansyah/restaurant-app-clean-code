import UrlParser from '../routes/url-parser';
import DrawerInitiator from '../utils/drawer-initiator';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import routes from '../routes/routes';

class App {
  constructor({ hamburger, drawer, content }) {
    this._hamburger = hamburger;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      hamburger: this._hamburger,
      drawer: this._drawer,
      content: this._content,
    });

    // inisialisasi komponen constructor
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url] ? routes[url] : routes['/'];
    this._content.innerHTML = await page.render();
    await page.afterRender();

    window.scroll(0, 0);
    document.querySelector('#beforeSkip').focus();
    const mainSection = document.querySelector('#content');
    const skipLinkElement = document.querySelector('.skip-link');
    skipLinkElement.addEventListener('click', (event) => {
      event.preventDefault();
      mainSection.scrollIntoView({ behavior: 'smooth' });
      skipLinkElement.blur();
    });
  }
}

export default App;
