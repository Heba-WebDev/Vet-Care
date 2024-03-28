declare namespace Express {
    interface Request {
        decodedToken?: {
            id: string,
            permission_type: string,
            job_title: string,
            iat: number,
            exp: number
        };
    }
}