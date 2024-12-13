"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputs = void 0;
const errors_1 = require("./errors");
const validateInputs = (...pairs) => {
    for (const [value, schema] of pairs) {
        const inputValidation = schema.safeParse(value);
        if (!inputValidation.success) {
            console.error(`Validation failed for ${JSON.stringify(value).substring(0, 100)} and ${JSON.stringify(schema)}: ${inputValidation.error.message}`);
            throw new errors_1.ValidationError("Validation failed");
        }
    }
};
exports.validateInputs = validateInputs;
