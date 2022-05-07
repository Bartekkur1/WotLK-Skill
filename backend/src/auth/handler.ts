import { Router } from 'express';
import { logger } from '../util/logger';
import { fetchAuthToken, fetchUserInfo } from './dcClient';

export const authHandler = Router();

authHandler.get('/auth', async (req, res, next) => {
    try {
        logger.debug('Authorizing new user...');
        const { code } = req.query;

        if (typeof code !== 'string' || code.length === 0) {
            throw new Error('Invalid authorization code!');
        }

        const { access_token } = await fetchAuthToken(code);
        const { id, username, avatar } = await fetchUserInfo(access_token);
        logger.debug({
            id, username, avatar
        });
        logger.debug('Authorization succeed!');
        return res.sendStatus(200);
    } catch (err) {
        logger.error(err);
        next(err);
    }
});