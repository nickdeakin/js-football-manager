"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT;
const app = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use('/assets', express_1.default.static(`${__dirname}/assets`));
    /* Redirect all routes to our (soon to exist) "index.html" file */
    app.get('/main.js', (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, 'main.js'));
    });
    /* Redirect all routes to our (soon to exist) "index.html" file */
    app.get('/*', (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, 'index.html'));
    });
    return app;
};
exports.app = app;
const listener = (0, exports.app)().listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map