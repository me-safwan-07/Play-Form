import { ValidationError } from "../validations/error.validations.js";

export const validateInputs = (...pairs) => {
    const error = [];

    for (const [value, schema] of pairs) {
        // Validate using joi
        const { error } = schema.validate(value, { abortEarly: false });

        if (error) {
            console.error(
                `Validation failed for ${JSON.stringify(value).substring(0, 100)} and ${JSON.stringify(schema)}: ${error.message}`
            );

            // Collect validation errors
            error.details.forEach((detail) => {
                error.push({
                    field: detail.path.join('.'), // Field that failed validation
                    message: detail.message, // Error message
                });
            });
        }
    }

    // If there are validation errors, throw a ValidationError
    if (error.length > 0) {
        throw new ValidationError("Validation failed", error);
    }
};