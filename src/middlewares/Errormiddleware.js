class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const ErrorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
        status: statusCode || 500,
        success: false,
        message: error.message || "Internal Server error"
    });
}

module.exports = { CustomError, ErrorHandler };