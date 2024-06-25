import { Router } from "express";
import { AuthController } from "./controllers";
import { StaffDatasourceImpl, StaffRepositoryImpl } from "../../infrastructure";

export class StaffRouters {

    static get routes(): Router {
        const router = Router();
        const datasource = new StaffDatasourceImpl();
        const staffRepo = new StaffRepositoryImpl(datasource);
        const controller = new AuthController(staffRepo);

        router.get('/current');
        router.get('/former');
        router.post('/register');
        router.post('/login', () => controller.loginStaff);
        router.post('/logout', () => controller.registerStaff);
        router.delete('/delete');
        router.patch('/verify');
        router.patch('/update');
        return router;
    }
}