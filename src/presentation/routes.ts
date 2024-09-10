import { Router } from 'express';
import { StaffRoutes } from '../features/Staff';
import { VetsRoutes } from '../features/Vets/presentation';
import { OwnersRoutes } from '../features/Owners';
import { AnimalsRoutes } from '../features/Animals/presentation';
import { PetsRoutes } from '../features/Pets/presentaiton';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/v2/staff', StaffRoutes.routes);
    router.use('/api/v2/vets', VetsRoutes.routes);
    router.use('/api/v2/owners', OwnersRoutes.routes);
    router.use('/api/v2/animals', AnimalsRoutes.routes);
    router.use('/api/v2', PetsRoutes.routes);
    return router;
  }
}
