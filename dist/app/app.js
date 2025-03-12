"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Dashboard_1 = __importDefault(require("./views/dashboard/Dashboard"));
const Fixtures_1 = __importDefault(require("./views/fixtures/Fixtures"));
const Tables_1 = __importDefault(require("./views/tables/Tables"));
const Settings_1 = __importDefault(require("./views/settings/Settings"));
class App {
    constructor() {
        this.pathToRegex = (path) => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');
        this.getParams = (match) => {
            const values = match.result.slice(1);
            const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1]);
            return Object.fromEntries(keys.map((key, i) => {
                return [key, values[i]];
            }));
        };
        this.navigateTo = (url) => {
            history.pushState(null, '', url);
            this.router();
        };
        this.router = () => __awaiter(this, void 0, void 0, function* () {
            const routes = [
                { path: '/', view: Dashboard_1.default },
                { path: '/fixtures', view: Fixtures_1.default },
                { path: '/tables/:id', view: Tables_1.default },
                { path: '/settings', view: Settings_1.default }
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
                qs.innerHTML = yield view.getHtml();
            }
        });
        this.setupEvents = () => {
            window.addEventListener('popstate', this.router);
            document.addEventListener('DOMContentLoaded', () => {
                document.body.addEventListener('click', (e) => {
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
        this.setupEvents();
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map