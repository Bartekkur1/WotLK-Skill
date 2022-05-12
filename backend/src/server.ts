import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import { authHandler } from './auth/handler';
import { playerHandler } from './player/handler';
import { ratingsHandler } from './ratings/handler';
import { ValidationErrpr } from './shared/validateData';
import cors from 'cors';
import { logger } from './util/logger';

export class WebServer {

    private app;

    constructor() {
        this.app = express();
    }

    private initRoutes() {
        this.app.use(cors());
        this.app.use(bodyParser.json());

        this.app.use(authHandler);
        this.app.use(playerHandler);
        this.app.use(ratingsHandler);

        this.app.use((req, res) => {
            return res.sendStatus(404);
        });

        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            if (err instanceof ValidationErrpr) {
                return res.status(400).json(err.toJson());
            }

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