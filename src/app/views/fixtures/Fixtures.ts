import AbstractView from '../AbstractView';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Fixtures');
  }

  async getHtml() {
    return `
        <h1>Fixtures</h1>
        <p>Today's fixtures</p>
    `;
  }
}
