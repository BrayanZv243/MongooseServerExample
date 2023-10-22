const winston = require ('winston');

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new  winston.transports.File({filename: 'error.log'})
    ]
});

class AppError extends Error{
    constructor(mesagge, statusCode) {
        super(mesagge);
        this.statusCode = statusCode;
        this.status = 'fail';
        this.isOptional = true;

        Error.captureStackTrace(this, this.constructor);
    }

}

const globalHandlerError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    logger.error()
}

module.exports = {
    AppError,
    globalHandlerError
}