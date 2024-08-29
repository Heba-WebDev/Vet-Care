import { Router } from 'express';
import { VetsDatasourceImpl, VetsRepositoryImpl } from '../infrastructure';
import { VetsController } from './controller.vets';
import { AuthMiddleware } from '../../../presentation';

export class VetsRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new VetsDatasourceImpl();
    const repository = new VetsRepositoryImpl(datasource);
    const controller = new VetsController(repository);

    router.post('/register', controller.register);
    router.patch(
      '/verify',
      [AuthMiddleware.authenticated, AuthMiddleware.authorized],
      controller.verify,
    );
    router.post('/login', controller.login);
    router.patch(
      '/:id',
      [AuthMiddleware.authenticated, AuthMiddleware.updateAuthorized],
      controller.update,
    );
    router.delete(
      '/delete',
      [AuthMiddleware.authenticated, AuthMiddleware.authorized],
      controller.delete,
    );
    router.get('/current', [AuthMiddleware.authenticated], controller.getAll);
    router.get(
      '/former',
      [AuthMiddleware.authenticated, AuthMiddleware.authorized],
      controller.getAllFormer,
    );
    return router;
  }
}
