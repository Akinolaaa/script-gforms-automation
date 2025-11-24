"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const google_forms_routes_1 = __importDefault(require("./domains/google-forms/google-forms.routes"));
const appRouter = express_1.default.Router();
appRouter.use("/api/google-forms", google_forms_routes_1.default);
exports.default = appRouter;
//# sourceMappingURL=router.js.map