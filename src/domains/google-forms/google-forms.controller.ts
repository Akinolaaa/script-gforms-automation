import { Request, Response } from "express";
import { Logger } from "../../utils/logger";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import * as querystring from "querystring";
import axios from "axios";

export class GoogleFormsController {
	private logger = new Logger(GoogleFormsController.name);
	private oauth2Client: OAuth2Client;
	private GOOGLE_CLIENT_ID: string;
	private GOOGLE_CLIENT_SECRET: string;

	constructor() {
		this.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
		this.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
		this.oauth2Client = new google.auth.OAuth2(
			process.env.GOOGLE_CLIENT_ID,
			process.env.GOOGLE_CLIENT_SECRET,
			`${process.env.APP_URL}/api/google-forms/auth/callback`
		);
	}

	getGoogleAuthUrl(_req: Request, res: Response) {
		const scopes = [
			// "https://www.googleapis.com/auth/drive",
			// "https://www.googleapis.com/auth/drive.file",
			// "https://www.googleapis.com/auth/drive.readonly",
			"https://www.googleapis.com/auth/forms.body",
			// "https://www.googleapis.com/auth/forms.body.readonly",
			// "https://www.googleapis.com/auth/forms.responses.readonly",
		];

		// Generate a url that asks permissions for the Drive activity scope
		const authorizationUrl = this.oauth2Client.generateAuthUrl({
			// 'online' (default) or 'offline' (gets refresh_token)
			access_type: "offline",
			/** Pass in the scopes array defined above.
			 * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
			scope: scopes,
			// Enable incremental authorization. Recommended as a best practice.
			include_granted_scopes: true,
			state: "state_parameter_passthrough_value",
			prompt: "consent",
		});
		res.status(200).json({ url: authorizationUrl });
	}

	public async authCallback(req: Request, res: Response) {
		try {
			const { code } = req.query;

			console.log({ query: req.query });
			// get tokens
			const tokens = await this.getOauthTokensWithCode(code as string);

			res.status(200).json(tokens);
		} catch (error) {
			console.log("Error occurred:", error);
		}
	}

	private async getGoogleAccessTokenCall(params: {
		code?: string;
		refreshToken?: string;
		grantType: "refresh_token" | "authorization_code";
	}) {
		const values = {
			client_id: this.GOOGLE_CLIENT_ID,
			client_secret: this.GOOGLE_CLIENT_SECRET,
			grant_type: params.grantType,
			refresh_token: params.refreshToken,
			code: params.code,
			redirect_uri: `${process.env.APP_URL}/api/google-forms/auth/callback`,
		};
		try {
			const response = await axios.post(
				"https://oauth2.googleapis.com/token",
				querystring.stringify(values),
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				}
			);
			return response.data;
		} catch (err: unknown) {
			console.error("error getting tokens");
			throw err;
		}
	}

	private async getOauthTokensWithCode(code: string) {
		try {
			const tokensData = await this.getGoogleAccessTokenCall({
				code,
				grantType: "authorization_code",
			});
			return tokensData;
		} catch (err: unknown) {
			console.error("error getting tokens");
			throw err;
		}
	}

	public async batchUpdate(_req: Request, _res: Response) {
		// const formId = "";
		// const url = `https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`;
		// const body = {
		// 	includeFormInResponse: true, // boolean,
		// 	requests: ["object (Request)"],
		// 	writeControl: "object (WriteControl)",
		// };
	}

	public async getForm(_req: Request, res: Response) {
		const formId = "1Towp-H0mo3wUzBKOGzeFy6PoCmUl0VIoNo-WS4Fjd1E";

		const resp = await axios.get(
			`https://forms.googleapis.com/v1/forms/${formId}`
		);

		res.status(200).json(resp.data);
	}
}
