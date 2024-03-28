import { Request as ExpressRequest } from "express";

interface CustomRequest extends ExpressRequest {
    decodedToken: {
        id: string,
        permission_type: string,
        job_title: string,
        iat: number,
        exp: number
    };
}

export { CustomRequest }