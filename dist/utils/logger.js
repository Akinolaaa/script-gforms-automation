"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = __importDefault(require("winston"));
const { combine, timestamp, printf, colorize } = winston_1.default.format;
const logFormat = printf(({ level, message, timestamp, context }) => {
    return `${timestamp} [${level}]${context ? ` [${context}]` : ""}: ${message}`;
});
class Logger {
    context;
    logger;
    constructor(context) {
        this.context = context || "";
        this.logger = winston_1.default.createLogger({
            level: "info",
            format: combine(colorize(), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.default.format((info) => {
                info.context = this.context;
                return info;
            })(), logFormat),
            transports: [
                new winston_1.default.transports.Console(),
                // You can add a File transport too if needed
            ],
        });
    }
    info(message) {
        this.logger.info(message);
    }
    warn(message) {
        this.logger.warn(message);
    }
    error(message, trace) {
        let traceString = "";
        if (trace) {
            try {
                traceString = typeof trace === "string" ? trace : JSON.stringify(trace);
            }
            catch {
                traceString =
                    trace instanceof Error ? trace.stack || trace.message : String(trace);
            }
        }
        this.logger.error(`${message}${traceString ? ` - ${traceString}` : ""}`);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map