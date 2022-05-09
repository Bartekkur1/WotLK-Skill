import { NextFunction, Request, Response } from "express";
import { AuthorizationError } from "../types";
import { verifyToken } from "../util/jwt";

export const securedPath = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.sendStatus(401);
    }

    const tokenRaw = req.headers.authorization;
    const token = tokenRaw.replace(/Bearer\s/, '');

    try {
        verifyToken(token);
        next();
    } catch (err) {
        next(new AuthorizationError());
    }
};