"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const google_forms_controller_1 = require("./google-forms.controller");
const googleFormsRouter = express_1.default.Router();
const googleFormsController = new google_forms_controller_1.GoogleFormsController();
googleFormsRouter.get("/auth/url", googleFormsController.getGoogleAuthUrl.bind(googleFormsController));
googleFormsRouter.get("/auth/callback", googleFormsController.authCallback.bind(googleFormsController));
exports.default = googleFormsRouter;
//# sourceMappingURL=google-forms.routes.js.map