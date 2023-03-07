class LoaderContent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this._innerHTML = `
      <span class="loader"></span>
    `;
  }
}

customElements.define('loader-content', LoaderContent);
