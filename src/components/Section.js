export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(array) {
    array.reverse().forEach((item) => {
      this._renderer(item);
    });
    console.log(array);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
