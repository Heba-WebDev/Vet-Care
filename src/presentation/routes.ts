import { Router } from 'express';
import { StaffRoutes } from '../features/Staff';
import { VetsRoutes } from '../features/Vets/presentation';
import { OwnersRoutes } from '../features/Owners';

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use('/api/v2/staff', StaffRoutes.routes);
        router.use('/api/v2/vets', VetsRoutes.routes);
        router.use('/api/v2/owners', OwnersRoutes.routes);
        return router;
    }
}
