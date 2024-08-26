import { Request, Response, NextFunction } from 'express';
import { validate as isUuid } from 'uuid';

export class IdMiddleware {
  static async validate(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!isUuid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    next();
  }
}
