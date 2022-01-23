import type { ErrorRequestHandler, Response } from "express";


class ErrorResponse extends Error{
    constructor (public statusCode: number, public message: string){
        super(message)
        this.statusCode = statusCode;
    }
}



const errorHandler: ErrorRequestHandler = (err:ErrorResponse, _req, res:Response, _next) => {
    res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message
    })
}

export {ErrorResponse, errorHandler};