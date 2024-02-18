import { Request, Response } from 'express';

const loggerMiddleware = (
  req: Request,
  res: Response,
  next: Function,
): void => {
  console.log(`Request...`);
  next();
};

export default loggerMiddleware;
