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
const AbstractView_1 = __importDefault(require("../AbstractView"));
class default_1 extends AbstractView_1.default {
    constructor(params) {
        super(params);
        this.setTitle('Dashboard');
    }
    getHtml() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=Dashboard.js.map