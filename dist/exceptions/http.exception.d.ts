interface HttpErrorPayload {
    message?: string;
    [key: string]: unknown;
}
export declare class HttpException extends Error {
    readonly statusCode: number;
    readonly payload?: HttpErrorPayload;
    constructor(messageOrObject: string | HttpErrorPayload, statusCode?: number);
}
export {};
//# sourceMappingURL=http.exception.d.ts.map