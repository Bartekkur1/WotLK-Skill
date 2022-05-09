import { Router } from 'express';
import { v4 } from 'uuid';
import { securedPath } from '../auth/middleware/securedPath';
import { playersDao } from '../persistance';
import { logger } from '../util/logger';

export const playerHandler = Router();

playerHandler.post('/player', securedPath, async (req, res, next) => {
    try {
        const { name, realm } = req.body;
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
    const id = req.params.id;
    if (!id) {
        return res.sendStatus(400);
    }

    const player = await playersDao.findPlayerById(id);

    return res.json({
        ...player
    }).status(200);
});