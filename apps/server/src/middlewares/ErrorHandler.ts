import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod"; // Assuming you're using Zod for schema validation

export const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  const isZodError = err instanceof ZodError;
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";

  let formattedMessage = errMsg;

  if (isZodError) {
    formattedMessage = err.errors.map((error: any) => ({
      code: error.code,
      expected: error.expected,
      received: error.received,
      path: error.path.join("."),
      message: error.message,
    }));
  }

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: formattedMessage,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};
