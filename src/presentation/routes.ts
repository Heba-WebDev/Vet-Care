import { Router } from 'express';
import { StaffRoutes } from '../features/Staff';
import { VetsRoutes } from '../features/Vets/presentation';


export class AppRoutes {

    static get routes(): Router {
        const router = Router();
        router.use('/api/v2/staff', StaffRoutes.routes);
        router.use('/api/v2/vets', VetsRoutes.routes);
        return router;
    }
}