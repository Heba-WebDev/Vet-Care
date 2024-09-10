import { Router } from 'express';
import { PetsController } from './pets.controller';
import { AuthMiddleware } from '../../../presentation';
import { PetsDatasourceImpl, PetsRepositoryImpl } from '../infrastructure';

export class PetsRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new PetsDatasourceImpl();
    const repository = new PetsRepositoryImpl(datasource);
    const controller = new PetsController(repository);

    router.post(
      '/owners/:owner_id/pets',
      [AuthMiddleware.authenticated],
      controller.register,
    );
    router.get(
      '/owners/:owner_id/pets',
      [AuthMiddleware.authenticated],
      controller.getAll,
    )
    return router;
  }
}
