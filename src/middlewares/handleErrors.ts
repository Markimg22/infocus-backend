import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line no-unused-vars
export const handleErrors = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
