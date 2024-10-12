import { Router } from 'express';
import { HolidaysDatasourceImpl, HolidaysRepositoryIml } from '../infrastructure';
import { HolidaysController } from './controller.holidays';
import { AuthMiddleware } from '../../../presentation';

export class HolidaysRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new HolidaysDatasourceImpl();
    const repository = new HolidaysRepositoryIml(datasource);
    const controller = new HolidaysController(repository);

    router.post('/', [AuthMiddleware.authenticated, AuthMiddleware.authorized], controller.add);
    router.get('/', [AuthMiddleware.authenticated], controller.get);
    return router;
  }
}
