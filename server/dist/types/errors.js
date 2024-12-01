"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = exports.ValidationError = exports.InvalidInputError = void 0;
class InvalidInputError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
        this.name = "InvalidInputError";
    }
}
exports.InvalidInputError = InvalidInputError;
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 500;
        this.name = "DatabaseError";
    }
}
exports.DatabaseError = DatabaseError;
