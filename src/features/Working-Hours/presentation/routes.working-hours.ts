import { Router } from 'express';
import { AuthMiddleware } from '../../../presentation';
import { WorkingHoursDatasourceImpl, WorkingHoursRepositoryImpl } from '../infrastructure';
import { WorkingHoursController } from './controller.working-hours';

export class WorkingHoursRoutes {
  static get routes(): Router {
    const router = Router();
    const datasouce = new WorkingHoursDatasourceImpl();
    const repository = new WorkingHoursRepositoryImpl(datasouce);
    const controller = new WorkingHoursController(repository);

    router.post(
      '/vets/:vet_id/working-hours',
      [AuthMiddleware.authenticated, AuthMiddleware.authorized],
      controller.add,
    );

    return router;
  }
}
