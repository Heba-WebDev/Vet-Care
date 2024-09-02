import { Router } from 'express';
import { AnimalsDatasourceImpl } from '../infrastructure/datasources';
import { AnimalsRepositoryImpl } from '../infrastructure/repositories';
import { AnimalsController } from './controllers.animals';
import { AuthMiddleware } from '../../../presentation';

export class AnimalsRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new AnimalsDatasourceImpl();
        const repository = new AnimalsRepositoryImpl(datasource);
        const controller = new AnimalsController(repository);

        router.post('/', [AuthMiddleware.authenticated, AuthMiddleware.authorized], controller.add);

        return router;
    }
}
