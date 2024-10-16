import express, { Router } from 'express';
import { AppRoutes } from './routes';
import { GlobalErrorMiddleware } from './middlewares';
import { logger } from '../infrastructure';

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

  async start(): Promise<void> {
    this.app.use(express.json());
    this.app.use(this.routes);
    this.app.use(new GlobalErrorMiddleware().notFound);
    this.app.use(new GlobalErrorMiddleware().error);
    this.app.listen(this.port, () => {
      logger.info(`Server running on ${this.port} 🚀`);
    });
  }
}
