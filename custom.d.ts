declare namespace Express {
    interface Request {
        decodedToken?: {
            id: string,
            permission_type: string,
            iat: number,
            exp: number
        };
    }
}