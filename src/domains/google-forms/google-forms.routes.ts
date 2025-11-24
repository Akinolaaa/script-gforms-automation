

import express from "express";
import { GoogleFormsController } from "./google-forms.controller";


const googleFormsRouter = express.Router();
const googleFormsController = new GoogleFormsController();

googleFormsRouter.get(
	"/auth/url",
	googleFormsController.getGoogleAuthUrl.bind(googleFormsController)
);

googleFormsRouter.get(
	"/auth/callback",
	googleFormsController.authCallback.bind(googleFormsController)
);

googleFormsRouter.get(
	"/get-form",
	googleFormsController.getForm.bind(googleFormsController)
);


export default googleFormsRouter