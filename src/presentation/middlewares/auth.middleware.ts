import {Request, Response, NextFunction } from 'express';
import { JwtAdapter } from '../../config';

export class AuthMiddlewear {
    static async validateJwt(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization') || req.header('authorization');
        if (!authorization) return res.status(400).json({ error: 'No token provided'});
        if (!authorization.startsWith('Bearer '))
            return res.status(401).json({ error: 'Invalid token'});
        const token = authorization.split(' ').at(1) || '';

        try {
            const payload = await JwtAdapter.validateToken<{id: string}>(token);
            if (!payload) return res.status(401).json({ error: 'Invalid token'});
            
        }catch(error) {

        }
        next();
    }
}