import express, { Router } from 'express';
import { AppRoutes } from './routes';
import { GlobalErrorMiddleware } from './middlewares';

interface options {
    port?: number;
    routes?: Router;
}

export class Server {
    private readonly app = express();
    private readonly port;
    private readonly routes: Router = AppRoutes.routes;
    constructor(options: options) {
        const { port = 5003 } = options;
        this.port = port;
    }

    async start() {
        this.app.use(express.json());
        this.app.use(this.routes);
        this.app.use(new GlobalErrorMiddleware().error);
        this.app.use(new GlobalErrorMiddleware().notFound);
        this.app.listen(this.port, () => {
            console.log(`Server running on ${this.port} 🚀`)
        })
    }

}