
class globalError extends Error {
    statusCode: number;
    statusText: string;
    constructor(message: string, code: number, text: string) {
        super(message);
        this.statusCode = code;
        this.statusText = text;
    }
}

export { globalError }
