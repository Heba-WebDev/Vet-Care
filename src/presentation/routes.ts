import { Router } from "express";
import { StaffRouters } from "./staff/routes";

export class AppRouters {

    static get routes(): Router {
        const router = Router();
        router.use('/api/v1/staff', StaffRouters.routes);
        return router;
    }
}