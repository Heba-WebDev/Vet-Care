import { Router } from 'express';
import { StaffController } from './controller.staff';
import { StaffDatasourceImpl, StaffRepositoryImpl } from '../infrastructure';
import { AuthMiddleware } from '../../../presentation';

export class StaffRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new StaffDatasourceImpl();
        const repository = new StaffRepositoryImpl(datasource);
        const controller = new StaffController(repository);

        router.post('/register', controller.register);
        router.post('/login', controller.login);
        router.patch(
            '/verify',
            [AuthMiddleware.authenticated, AuthMiddleware.authorized],
            controller.verify,
        );
        router.delete(
            '/delete',
            [AuthMiddleware.authenticated, AuthMiddleware.authorized],
            controller.delete,
        );
        router.get(
            '/current',
            [AuthMiddleware.authenticated],
            controller.getAll,
        );
        router.get(
            '/former',
            [AuthMiddleware.authenticated, AuthMiddleware.authorized],
            controller.getAllFormer,
        );
        router.patch(
            '/update',
            [AuthMiddleware.authenticated, AuthMiddleware.updateAuthorized],
            controller.update,
        );
        return router;
    }
}
