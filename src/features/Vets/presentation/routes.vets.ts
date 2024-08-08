import { Router } from 'express';
import { VetsDatasourceImpl } from '../infrastructure';
import { VetsRepositoryImpl } from '../infrastructure/repositories';
import { VetsController } from './controller.vets';


export class VetsRoutes {

    static get routes(): Router {
        const router = Router();
        const datasource = new VetsDatasourceImpl();
        const repository = new VetsRepositoryImpl(datasource);
        const controller = new VetsController(repository);

        router.post('/register', controller.register)

        return router;
    }
}