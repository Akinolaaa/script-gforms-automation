export declare class Logger {
    private context?;
    private logger;
    constructor(context?: string);
    info(message: string): void;
    warn(message: string): void;
    error(message: string, trace?: string | object): void;
}
//# sourceMappingURL=logger.d.ts.map