import { Router } from 'express';
import { StaffController } from './controller.staff';
import { StaffDatasourceImpl, StaffRepositoryImpl } from '../infrastructure';

export class StaffRoutes {

    static get routes(): Router {
        const router = Router();
        const datasource = new StaffDatasourceImpl();
        const repository = new StaffRepositoryImpl(datasource);
        const controller = new StaffController(repository);

        router.post('/register', controller.registerStaff)
        router.post('/login')
        router.patch('/verify')
        router.get('/current')
        router.get('/former')
        return router;
    }
}