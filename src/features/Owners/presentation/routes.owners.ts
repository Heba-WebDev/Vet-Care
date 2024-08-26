import { Router } from 'express';
// import { OwnersDatasourceImpl, OwnersRepositoryImpl } from '../infrastructure';
import { AuthMiddleware } from '../../../presentation';
import { OwnersController } from './controller.owners';
import { OwnersDatasourceImpl } from '../infrastructure/datasources';
import { OwnersRepositoryImpl } from '../infrastructure/repositories/owners.repository.impl';
import { IdMiddleware } from '../../../presentation/middlewares/uuid.middleware';

export class OwnersRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new OwnersDatasourceImpl();
    const repository = new OwnersRepositoryImpl(datasource);
    const controller = new OwnersController(repository);

    router.post('/register', [AuthMiddleware.authenticated], controller.register);
    router.get('/', [AuthMiddleware.authenticated], controller.getAll);
    router.patch(
      '/:id',
      [AuthMiddleware.authenticated],
      [IdMiddleware.validate],
      controller.update,
    );

    return router;
  }
}
