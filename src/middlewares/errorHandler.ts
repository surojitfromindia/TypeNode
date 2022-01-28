import type { ErrorRequestHandler, Response } from 'express';

class ErrorResponse extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public messages?: string[]
  ) {
    super(message);
    this.statusCode = statusCode;
    this.messages = messages;
  }
}

const errorHandler: ErrorRequestHandler = (
  err: ErrorResponse,
  _req,
  res: Response,
  _next
) => {
  const messages: string[] = err?.message ? [err.message] : err?.messages;
  res.status(err.statusCode).json({
    success : false,
    status: err.statusCode,
    messages: messages,
  });
};

export { ErrorResponse, errorHandler };
