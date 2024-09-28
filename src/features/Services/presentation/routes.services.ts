import { Router } from 'express';
import { AuthMiddleware } from '../../../presentation';
import { ServicesController } from './controller.services';
import { ServicesDatasourceImpl, ServicesRepositoryImpl } from '../infrastructure';

export class ServicesRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new ServicesDatasourceImpl();
    const repository = new ServicesRepositoryImpl(datasource);
    const controller = new ServicesController(repository);
    router.post(
      '/',
      [AuthMiddleware.authenticated, AuthMiddleware.authorized],
      controller.addAService,
    );
    router.patch(
      '/:id',
      [AuthMiddleware.authenticated, AuthMiddleware.authorized],
      controller.update,
    );
    router.patch(
      '/activate/:id',
      [AuthMiddleware.authenticated, AuthMiddleware.authorized],
      controller.activate,
    );
    router.patch(
      '/deactivate/:id',
      [AuthMiddleware.authenticated, AuthMiddleware.authorized],
      controller.deactivate,
    );
    router.get('/', [AuthMiddleware.authenticated, AuthMiddleware.authorized], controller.getAll);
    return router;
  }
}
