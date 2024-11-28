class ValidationError extends Error {
    statusCode = 400;
    constructor(messsage) {
        super(messsage);
        this.name = "ValidationError";
    }
}

export {
    ValidationError
};