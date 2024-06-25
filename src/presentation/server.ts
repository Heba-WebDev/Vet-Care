import express, { Router } from 'express'

interface options {
    port?: number;
    routes: Router;
}

export class Server
{
    public readonly app = express()
    private readonly port;
    private readonly routes: Router;

    constructor(options: options) {
        const { port = 5002, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    async start() {
        this.app.use(express.json());
        this.app.use(this.routes);
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        })
    }
}