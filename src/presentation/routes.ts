import { Router } from 'express';
import { StaffRoutes } from '../features/Staff';
import { VetsRoutes } from '../features/Vets/presentation';
import { OwnersRoutes } from '../features/Owners';
import { AnimalsRoutes } from '../features/Animals/presentation';
import { PetsRoutes } from '../features/Pets/presentaiton';
import { ServicesRoutes } from '../features/Services/presentation';
import { WorkingDaysRoutes } from '../features/Working-Days';
import { HolidaysRoutes } from '../features/Holidays';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/v2/staff', StaffRoutes.routes);
    router.use('/api/v2/vets', VetsRoutes.routes);
    router.use('/api/v2/owners', OwnersRoutes.routes);
    router.use('/api/v2/animals', AnimalsRoutes.routes);
    router.use('/api/v2', PetsRoutes.routes);
    router.use('/api/v2/services', ServicesRoutes.routes);
    router.use('/api/v2/working-days', WorkingDaysRoutes.routes);
    router.use('/api/v2/holidays', HolidaysRoutes.routes);
    return router;
  }
}
