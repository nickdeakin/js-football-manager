import Dashboard from './views/dashboard/Dashboard';
import Fixtures from './views/fixtures/Fixtures';
import Tables from './views/tables/Tables';
import Settings from './views/settings/Settings';

export default class App {
  constructor() {
    this.setupEvents();
  }

  pathToRegex = (path: any) => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

  getParams = (match: any) => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result: any) => result[1]);

    return Object.fromEntries(
      keys.map((key, i) => {
        return [key, values[i]];
      })
    );
  };

  navigateTo = (url: string) => {
    history.pushState(null, '', url);
    this.router();
  };

  router = async () => {
    const routes = [
      { path: '/', view: Dashboard },
      { path: '/fixtures', view: Fixtures },
      { path: '/tables/:id', view: Tables },
      { path: '/settings', view: Settings }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
      return {
        route: route,
        result: location.pathname.match(this.pathToRegex(route.path))
      };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
      match = {
        route: routes[0],
        result: [location.pathname]
      };
    }

    const view = new match.route.view(this.getParams(match));

    const qs = document.querySelector('#app');
    if (qs) {
      qs.innerHTML = await view.getHtml();
    }
  };

  setupEvents = () => {
    window.addEventListener('popstate', this.router);

    document.addEventListener('DOMContentLoaded', () => {
      document.body.addEventListener('click', (e: any) => {
        if (e && e.target) {
          if (e.target.matches('[data-link]')) {
            e.preventDefault();
            this.navigateTo(e.target.href);
          }
        }
      });
    });

    this.router();
  };
}
