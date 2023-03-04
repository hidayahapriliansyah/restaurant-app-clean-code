import UrlParser from '../routes/url-parser';
import DrawerInitiator from '../utils/drawer-initiator';
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
    const page = routes[url];
    console.log('test routes', await routes['/favorite-restaurant'].render());
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
