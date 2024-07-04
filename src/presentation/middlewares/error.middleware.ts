import { Request, Response, NextFunction } from 'express';

export class GlobalErrorMiddleware {
    error(error: Error, req: Request, res: Response, next: NextFunction) {
        res.status(500).send({error: error.message})
    }

    notFound(req: Request, res: Response, next: NextFunction) {
        res.status(404).send({error: 'Resource not found'})
    }
}