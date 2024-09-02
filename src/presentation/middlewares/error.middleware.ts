/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { logger } from '../../infrastructure';

export class GlobalErrorMiddleware {
  error(error: Error, req: Request, res: Response, next: NextFunction) {
    logger.error(`Error occurred: ${error.message}`, { error });
    res.status(500).send({ error: error.message });
  }

  notFound(req: Request, res: Response, next: NextFunction) {
    res.status(404).send({ error: 'Resource not found' });
  }
}
