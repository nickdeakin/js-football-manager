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
        this.setTitle('Settings');
    }
    getHtml() {
        return __awaiter(this, void 0, void 0, function* () {
            return `
        <h1>Settings</h1>
        <p>Manage your privacy and configuration.</p>
    `;
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=Settings.js.map