import { Router } from 'express';
import { VetsDatasourceImpl, VetsRepositoryImpl } from '../infrastructure';
import { VetsController } from './controller.vets';
import { AuthMiddlewear } from '../../../presentation';

export class VetsRoutes {

    static get routes(): Router {
        const router = Router();
        const datasource = new VetsDatasourceImpl();
        const repository = new VetsRepositoryImpl(datasource);
        const controller = new VetsController(repository);

        router.post('/register', controller.register)
        router.patch('/verify', [AuthMiddlewear.authenticated, AuthMiddlewear.authorized], controller.verify)
        router.post('/login', controller.login)
        router.patch('/update', [AuthMiddlewear.authenticated, AuthMiddlewear.updateAuthorized], controller.update)
        router.delete('/delete',[AuthMiddlewear.authenticated, AuthMiddlewear.authorized], controller.delete)
        router.get('/current', [AuthMiddlewear.authenticated], controller.getAll)
        router.get('/former', [AuthMiddlewear.authenticated, AuthMiddlewear.authorized], controller.getAllFormer)
        return router;
    }
}
