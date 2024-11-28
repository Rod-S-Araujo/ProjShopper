import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err.error_code && err.error_description) {
    res.status(400).json({
      error_code: err.error_code,
      error_description: err.error_description,
    });
    return;
  }

  res.status(500).json({
    error_code: "INTERNAL_SERVER_ERROR",
    error_description: "Something went wrong on the server.",
  });
  return;
};

export default errorHandler;
