"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleFormsController = void 0;
const logger_1 = require("../../utils/logger");
const googleapis_1 = require("googleapis");
const querystring = __importStar(require("querystring"));
const axios_1 = __importDefault(require("axios"));
class GoogleFormsController {
    logger = new logger_1.Logger(GoogleFormsController.name);
    oauth2Client;
    GOOGLE_CLIENT_ID;
    GOOGLE_CLIENT_SECRET;
    constructor() {
        this.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
        this.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
        this.oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, `${process.env.APP_URL}/api/google-forms/auth/callback`);
    }
    getGoogleAuthUrl(_req, res) {
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
    async authCallback(req, res) {
        try {
            const { code } = req.query;
            console.log({ query: req.query });
            // get tokens
            const tokens = await this.getOauthTokensWithCode(code);
            res.status(200).json(tokens);
        }
        catch (error) {
            console.log("Error occurred:", error);
        }
    }
    // http://localhost:4000/api/google-forms/auth/callback?state=state_parameter_passthrough_value&code=4/0Ab32j93k-c78txo8JwxwHWYSt2m6-XbnEIyG34TO4cM5Jw9kWQg7xb07qSYfCynp791s8Q&scope=https://www.googleapis.com/auth/forms.body
    async getGoogleAccessTokenCall(params) {
        const values = {
            client_id: this.GOOGLE_CLIENT_ID,
            client_secret: this.GOOGLE_CLIENT_SECRET,
            grant_type: params.grantType,
            refresh_token: params.refreshToken,
            code: params.code,
            redirect_uri: `${process.env.APP_URL}/api/google-forms/auth/callback`,
        };
        try {
            const response = await axios_1.default.post("https://oauth2.googleapis.com/token", querystring.stringify(values), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            return response.data;
        }
        catch (err) {
            console.error("error getting tokens");
            throw err;
        }
    }
    async getOauthTokensWithCode(code) {
        try {
            const tokensData = await this.getGoogleAccessTokenCall({
                code,
                grantType: "authorization_code",
            });
            return tokensData;
        }
        catch (err) {
            console.error("error getting tokens");
            throw err;
        }
    }
}
exports.GoogleFormsController = GoogleFormsController;
//# sourceMappingURL=google-forms.controller.js.map