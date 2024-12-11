"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = exports.ValidationError = exports.InvalidInputError = exports.ResourceNotFoundError = void 0;
class ResourceNotFoundError extends Error {
    constructor(resource, id) {
        super(`${resource} with ID ${id} not found`);
        this.statusCode = 404;
        this.name = "ResourceNotFoundError";
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;
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
