import AbstractView from '../AbstractView';

export default class extends AbstractView {
  tableId;

  constructor(params) {
    super(params);
    this.tableId = params.id || null;
    this.setTitle('Tables');
  }

  async getHtml() {
    return `
        <h1>Tables</h1>
        <p>You are viewing post #${this.tableId}.</p>
    `;
  }
}
