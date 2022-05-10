import { Router } from 'express';
import { v4 } from 'uuid';
import { securedPath } from '../auth/middleware/securedPath';
import { playersDao, ratingsDao } from '../persistance';
import { Rating } from '../persistance/types';
import { IdSchema } from '../shared/schema';
import { validateData } from '../shared/validateData';
import { logger } from '../util/logger';
import { RatingSchema } from './schema';

export const ratingsHandler = Router();

ratingsHandler.post('/rating', securedPath, async (req, res, next) => {
    try {
        const rating = validateData<Rating>(RatingSchema, req.body);
        const id = v4();

        const { sessionUser } = res.locals;

        await ratingsDao.saveRating({ ...rating, id, author: sessionUser.id });
        return res.json({
            id
        }).status(200);
    } catch (err) {
        logger.error(err);
        next(err);
    }
});

ratingsHandler.get('/rating/player/:id', async (req, res, next) => {
    try {
        const { id } = validateData<{ id: string }>(IdSchema, req.params);
        const player = await playersDao.findPlayerById(id);
        const ratings = await ratingsDao.findPlayerRatings(id);

        return res.json({
            player,
            ratings
        }).status(200);
    } catch (err) {
        logger.error(err);
        next(err);
    }
});