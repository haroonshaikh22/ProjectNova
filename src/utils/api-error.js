class ApiError extends Error {
  constructor(statusCode, message = "something went wrong", errors =[], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.errors = errors;
    this.susscess = false;
    if (stack) {
      this.stack = stack;
      console.log('=========stack==========================');
      console.log(stack);
      console.log('====================================');
    } else {
      console.log('========this============================');
      console.log(this, this.constructor);
      console.log('====================================');
      Error.captureStackTrace(this, this.constructor);
    }

  }
}

export { ApiError };
