declare namespace Express {
    interface Request {
        payload?: {
            id: string;
            permission_type: string;
            job_title: string;
            iat: number;
            exp: number;
        };
    }
}
