"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const errors_1 = require("./errors");
const handleError = (error, res) => {
    console.error('Error:', error);
    if (error instanceof errors_1.NotFoundError) {
        res.status(404).json({ error: error.message });
    }
    else if (error instanceof errors_1.ValidationError) {
        res.status(400).json({ error: error.message });
    }
    else if (error instanceof errors_1.AuthorizationError) {
        res.status(403).json({ error: error.message });
    }
    else {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.handleError = handleError;
