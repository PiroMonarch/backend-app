class ApiError extends Error {
    constructor(statusCode,
        message= "something went wrong",
        error = [],
        stack =""
    ){ super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = error // Fixed: Removed space and changed 'errors' to 'error'


        if(stack) {
            this.stack = stack // Fixed: Removed erroneous backticks
        } else {
            Error.captureStackTrace(this,this.constructor)
        }
        }
    }


export { ApiError as APIError } // Fixed: Export as APIError for consistency
