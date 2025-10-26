class ApiResponse {
    constructor(statusCode, data, message, success) {
        this.statusCode = statusCode // Fixed: Changed 'statusccode' typo to 'statusCode'
        this.data = data
        this.message = message
        this.success = success !== undefined ? success : statusCode < 400 // Fixed: Added success parameter handling
    }
}

export { ApiResponse } // Fixed: Added space for readability
    


