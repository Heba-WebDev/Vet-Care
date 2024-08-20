import { Router } from 'express';
// import { OwnersDatasourceImpl, OwnersRepositoryImpl } from '../infrastructure';
import { AuthMiddlewear } from '../../../presentation';
import { OwnersController } from './controller.owners';
import { OwnersDatasource, OwnersRepository } from '../domain';
import { OwnersDatasourceImpl } from '../infrastructure/datasources';
import { OwnersRepositoryImpl } from '../infrastructure/repositories/owners.repository.impl';

export class OwnersRoutes {

    static get routes(): Router {
        const router = Router();
        const datasource = new OwnersDatasourceImpl();
        const repository = new OwnersRepositoryImpl(datasource);
        const controller = new OwnersController(repository);

        router.post('/register', [AuthMiddlewear.authenticated], controller.register)

        return router;
    }
}
