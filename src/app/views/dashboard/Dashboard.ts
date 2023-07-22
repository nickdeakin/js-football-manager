import AbstractView from '../AbstractView';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Dashboard');
  }

  async getHtml() {
    return `
        <h1>Welcome back</h1>
        <p>
            Fugiat voluptate et nisi Lorem cillum anim sit do eiusmod occaecat irure do. Reprehenderit anim fugiat sint exercitation consequat. Sit anim laborum sit amet Lorem adipisicing ullamco duis. Anim in do magna ea pariatur et.
        </p>
        <p>
            <a href="/tables" data-link>View all tables</a>.
            <a href="/tables/1" data-link>View your table</a>.
            <a href="/fixtures" data-link>View fixtures</a>.
        </p>
    `;
  }
}
