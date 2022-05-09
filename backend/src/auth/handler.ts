import { Router } from 'express';
import { usersDao } from '../persistance';
import { logger } from '../util/logger';
import { fetchAuthToken, fetchUserInfo } from './util/dcClient';
import { createToken, verifyToken } from './util/jwt';

export const authHandler = Router();

authHandler.get('/auth', async (req, res, next) => {
    try {
        logger.debug('Authorizing new user...');
        const { code } = req.query;

        if (typeof code !== 'string' || code.length === 0) {
            throw new Error('Invalid authorization code!');
        }

        const { access_token } = await fetchAuthToken(code);
        const user = await fetchUserInfo(access_token);

        await usersDao.saveUser(user);
        const token = createToken(user);

        logger.debug('Authorization succeed!');
        return res.json({
            token
        }).status(200);
    } catch (err) {
        logger.error(err);
        next(err);
    }
});

authHandler.get('/verify', async (req, res, next) => {
    const tokenRaw = req.headers.authorization || "";
    const token = tokenRaw.replace(/Bearer\s/, '');

    if (!token) {
        return res.sendStatus(400);
    }

    logger.info(`Veryfing JWT`);
    try {
        const payload = verifyToken(token);
        return res.json(payload).status(200);
    } catch (err) {
        return res.sendStatus(401);
    }
});