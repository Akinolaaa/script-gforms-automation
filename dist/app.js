"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
// import { errorHandler } from "./middleware/global-error-handler";
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.set("trust proxy", 1);
app.use(express_1.default.json());
app.get("/", (_, res) => {
    res.send("<h1>Transfat API</h1>");
});
// routes
app.use(router_1.default);
// extra packages
// errors
// app.use(notFoundMiddleware);
// app.use(errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map