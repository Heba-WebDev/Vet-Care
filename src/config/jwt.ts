import jwt from 'jsonwebtoken';

type payload = {
    id: string;
}

export class JwtAdapter {
    static async generateToken(
        payload: payload,
        duration: string = '14h'
    ): Promise<string | null> {

        return new Promise(( resolve ) => {
            jwt.sign( payload, 'SEED', { expiresIn: duration },
            (err, token ) => {
                if (err) return resolve(null);
                return resolve(token!);
            });
        })
    }

    static async validateToken(token: string): Promise<payload | null> {
        return new Promise(( resolve ) => {
            jwt.verify(token, 'SEED', (error, decoded) => {
                if (error) return resolve(null);
                return resolve(decoded as payload);
            })
        })
    }
}