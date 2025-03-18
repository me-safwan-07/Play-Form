export const errorHandler = (err, req, res, next) => {
    console.log(err);

    const statusCode = 
        err.message.includes("Validation Error") ? 400 :
        err.message.includes("already exists") ? 409 :
        err.message.includes("Database Error") ? 500 : 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};

