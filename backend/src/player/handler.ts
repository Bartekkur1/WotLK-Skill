import { Router } from 'express';
import { v4 } from 'uuid';
import { securedPath } from '../auth/middleware/securedPath';
import { playersDao } from '../persistance';
import { Player } from '../persistance/types';
import { IdSchema } from '../shared/schema';
import { validateData } from '../shared/validateData';
import { logger } from '../util/logger';
import { PlayerSchema } from './schema';

export const playerHandler = Router();

playerHandler.post('/player', securedPath, async (req, res, next) => {
    try {
        const { name, realm } = validateData<Player>(PlayerSchema, req.body);
        const playerExists = await playersDao.playerExists(name, realm);
        if (playerExists) {
            logger.debug(`Player already exists!`);
            const { id } = await playersDao.findPlayer(name, realm);
            return res.redirect(`/player/${id}`);
        }

        const id = v4();
        await playersDao.savePlayer({ id, name, realm });
        return res.json({ id }).status(200);
    } catch (err) {
        logger.error(err);
        next(err);
    }
});

playerHandler.get('/player/:id', async (req, res, next) => {
    try {
        const { id } = validateData<{ id: string }>(IdSchema, req.params);
        const player = await playersDao.findPlayerById(id);

        return res.json({
            ...player
        }).status(200);
    } catch (err) {
        logger.error(err);
        next(err);
    }
});