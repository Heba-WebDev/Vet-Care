import { Request, Response, NextFunction } from 'express';
import { JwtAdapter } from '../../config';
import { payload } from '../../interfaces';
import { logger } from '../../infrastructure';

export class AuthMiddleware {
    static async authenticated(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        const authorization =
            req.header('Authorization') || req.header('authorization');
        if (!authorization)
            return res.status(400).json({ error: 'No token provided' });
        if (!authorization.startsWith('Bearer '))
            return res.status(401).json({ error: 'Invalid token' });
        const token = authorization.split(' ').at(1) || '';

        try {
            const payload = await JwtAdapter.validateToken<payload>(token);
            if (!payload)
                return res.status(401).json({ error: 'Invalid token' });
            req.body.payload = payload;
        } catch (error) {
            logger.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        next();
    }

    static async authorized(req: Request, res: Response, next: NextFunction) {
        const payload: payload = req.body.payload;
        if (
            payload.permission_type !== 'Admin' ||
            (payload?.job_title !== 'HR' && payload?.job_title !== 'Manager')
        ) {
            return res
                .status(401)
                .json({ error: 'Unauthorized to perform this action' });
        }
        next();
    }
    static async updateAuthorized(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        const payload: payload = req.body.payload;
        if (payload.id === req.body.id || payload.permission_type === 'Admin') {
            next();
        } else {
            return res
                .status(401)
                .json({ error: 'Unauthorized to perform this action' });
        }
    }
}
