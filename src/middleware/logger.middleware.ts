import { Request, Response, NextFunction } from 'express';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const date = new Date();
  console.log(`[${date.toISOString()}] ${req.method} ${req.url}`);
  next();
};

export default loggerMiddleware;

  
