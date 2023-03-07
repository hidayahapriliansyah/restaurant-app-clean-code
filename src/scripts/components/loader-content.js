class LoaderContent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <span class="loader"></span>
    `;
  }
}

customElements.define('loader-content', LoaderContent);
