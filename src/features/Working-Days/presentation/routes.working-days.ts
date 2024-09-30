import { Router } from 'express';
import { WorkingDaysDatasourceImpl, WorkingDaysRepositoryImpl } from '../infrastructure';
import { WorkingDaysController } from './controller.working-days';
import { AuthMiddleware } from '../../../presentation';

export class WorkingDaysRoutes {
  static get routes(): Router {
    const router = Router();
    const datasouce = new WorkingDaysDatasourceImpl();
    const repository = new WorkingDaysRepositoryImpl(datasouce);
    const controller = new WorkingDaysController(repository);

    router.patch('/', [AuthMiddleware.authenticated, AuthMiddleware.authorized], controller.update);
    router.get('/', [AuthMiddleware.authenticated], controller.get);

    return router;
  }
}
