import type { ErrorRequestHandler, Response } from 'express';
import { string } from 'joi';

class ErrorResponse extends Error {
  constructor(public statusCode: number, public messages: string[]) {
    super();
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
  const messages: string[] = Array.isArray(err?.messages) ? err.messages : [];
  res.status(err.statusCode).json({
    success: false,
    status: err.statusCode,
    messages: messages,
  });
};

export { ErrorResponse, errorHandler };
