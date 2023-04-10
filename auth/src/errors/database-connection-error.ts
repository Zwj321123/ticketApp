import { CustomError } from './custom-error';
export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connecting to database';
    constructor() {
        super('Error connecting to db');
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    /**
     * Serialize the error to be sent to the client
     */
    serializeErrors() {
        return [
            { message: this.reason }
        ]
    }
}