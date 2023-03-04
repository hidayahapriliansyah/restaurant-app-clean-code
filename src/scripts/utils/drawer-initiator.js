const DrawerInitiator = {
  init({ hamburger, drawer, content }) {
    hamburger.addEventListener('click', (event) => {
      this._toogleXHamburger(hamburger);
      this._toggleDrawer(event, drawer);
    });

    content.addEventListener('click', (event) => {
      if (hamburger.classList.contains('x')) {
        this._toogleXHamburger(hamburger);
      }

      this._closeDrawer(event, drawer);
    });
  },

  _toogleXHamburger(hamburger) {
    hamburger.classList.toggle('x');
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('active');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('active');
  },
};

export default DrawerInitiator;
