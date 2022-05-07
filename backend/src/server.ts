import express, { NextFunction, Request, Response } from 'express';
import { authHandler } from './auth/handler';
import { logger } from './util/logger';

export class WebServer {

    private app;

    constructor() {
        this.app = express();
    }

    private initRoutes() {
        this.app.use(authHandler);

        this.app.use((req, res) => {
            return res.sendStatus(404);
        });

        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            return res.status(400).json({
                error: err.message
            });
        });
    }

    public start() {
        this.initRoutes();
        this.app.listen(process.env.WEB_PORT || 8000, () => {
            logger.info(`server running on ${process.env.WEB_PORT}`);
        });
    }
}