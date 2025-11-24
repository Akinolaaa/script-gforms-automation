"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    statusCode;
    payload;
    constructor(messageOrObject, statusCode = 500) {
        const message = typeof messageOrObject === "string"
            ? messageOrObject
            : messageOrObject.message ?? "An error has occurred";
        super(message);
        this.statusCode = statusCode;
        if (typeof messageOrObject === "object") {
            this.payload = messageOrObject;
        }
        Object.setPrototypeOf(this, HttpException.prototype);
        this.name = this.constructor.name;
    }
}
exports.HttpException = HttpException;
//# sourceMappingURL=http.exception.js.map