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

        router.post('/register', controller.registerStaff)
        router.post('/login', controller.loginStaff)
        router.patch('/verify', [AuthMiddlewear.authenticated, AuthMiddlewear.authorized], controller.verifyStaff)
        router.delete('/delete', [AuthMiddlewear.authenticated, AuthMiddlewear.authorized], controller.deleteStaff)
        router.get('/current', [AuthMiddlewear.authenticated], controller.getAllStaff)
        router.get('/former', [AuthMiddlewear.authenticated, AuthMiddlewear.authorized], controller.getAllFormerStaff)
        router.patch('/update', [AuthMiddlewear.authenticated, AuthMiddlewear.updateAuthorized], controller.updateStaff)
        return router;
    }
}