import { Router } from 'express';
import { StaffController } from './controller.staff';
import { StaffDatasourceImpl, StaffRepositoryImpl } from '../infrastructure';
import { AuthMiddlewear } from '../../../presentation';

export class StaffRoutes {

    static get routes(): Router {
        const router = Router();
        const datasource = new StaffDatasourceImpl();
        const repository = new StaffRepositoryImpl(datasource);
        const controller = new StaffController(repository);

        router.post('/register', controller.register)
        router.post('/login', controller.login)
        router.patch('/verify', [AuthMiddlewear.authenticated, AuthMiddlewear.authorized], controller.verify)
        router.delete('/delete', [AuthMiddlewear.authenticated, AuthMiddlewear.authorized], controller.delete)
        router.get('/current', [AuthMiddlewear.authenticated], controller.getAll)
        router.get('/former', [AuthMiddlewear.authenticated, AuthMiddlewear.authorized], controller.getAllFormer)
        router.patch('/update', [AuthMiddlewear.authenticated, AuthMiddlewear.updateAuthorized], controller.update)
        return router;
    }
}
