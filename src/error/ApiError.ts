class ApiError extends Error{
    status;
    message;
    constructor(status, message) {
        super();
        this.message = message;
        this.status = status;
    }
    static unauthorizedError(){
        return new ApiError(401, "User is not authorized")
    }

    static badRequest(message) {
        return new ApiError(404, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }
}

module.exports = ApiError