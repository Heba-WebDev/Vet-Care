import { Router } from 'express';
import { StaffRoutes } from '../features/Staff';


export class AppRoutes {

    static get routes(): Router {
        const router = Router();
        router.use('/api/v2/staff', StaffRoutes.routes);
        return router;
    }
}