import { Request, Response } from "express";
export declare class GoogleFormsController {
    private logger;
    private oauth2Client;
    private GOOGLE_CLIENT_ID;
    private GOOGLE_CLIENT_SECRET;
    constructor();
    getGoogleAuthUrl(_req: Request, res: Response): void;
    authCallback(req: Request, res: Response): Promise<void>;
    private getGoogleAccessTokenCall;
    private getOauthTokensWithCode;
}
//# sourceMappingURL=google-forms.controller.d.ts.map