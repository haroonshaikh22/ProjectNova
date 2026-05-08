class ApiResponse {

    constructor(status, message, data = null) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.success = status < 400; // success if status code is less than 400
    }

   
}

export { ApiResponse };