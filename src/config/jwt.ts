import jwt from 'jsonwebtoken';
import { envs } from './envs';
import { payload } from '../interfaces';


const JWT_SECRET_KEY = envs.JWT_SECRET_KEY;


export class JwtAdapter {
    static async generateToken(
        payload: payload,
        duration: string = '14h'
    ): Promise<string | null> {

        return new Promise(( resolve ) => {
            jwt.sign( payload, JWT_SECRET_KEY, { expiresIn: duration },
            (err, token ) => {
                if (err) return resolve(null);
                return resolve(token!);
            });
        })
    }

    static async validateToken<T>(token: string): Promise<T | null> {
        return new Promise(( resolve ) => {
            jwt.verify(token, JWT_SECRET_KEY, (error, decoded) => {
                if (error) return resolve(null);
                return resolve(decoded as T);
            })
        })
    }
}