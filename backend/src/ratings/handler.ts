import { Router } from 'express';
import { v4 } from 'uuid';
import { securedPath } from '../auth/middleware/securedPath';
import { playersDao, ratingsDao } from '../persistance';
import { Rating } from '../persistance/types';
import { IdSchema } from '../shared/schema';
import { validateData } from '../shared/validateData';
import { logger } from '../util/logger';
import { RatingSchema, RatingUpdateSchema } from './schema';

export const ratingsHandler = Router();

ratingsHandler.post('/rating', securedPath, async (req, res, next) => {
    try {
        const rating = validateData<Rating>(RatingSchema, req.body);
        const id = v4();

        const { sessionUser } = res.locals;
        const userRatings = await ratingsDao.findUserRatings(sessionUser.id);

        const playerAlreadyRated = userRatings.some(r => r.player === rating.player);
        if (playerAlreadyRated) {
            return res.json({
                error: "Player already rated!"
            }).status(400);
        }

        await ratingsDao.saveRating({ ...rating, id, author: sessionUser.id });
        logger.info(`Creating new rating ${id} by user ${sessionUser.id}`);
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

        logger.info(`Fetching user ${id} rating`);

        return res.json({
            player,
            ratings
        }).status(200);
    } catch (err) {
        logger.error(err);
        next(err);
    }
});

ratingsHandler.delete('/rating/:id', securedPath, async (req, res, next) => {
    try {
        const { id } = validateData<{ id: string }>(IdSchema, req.params);
        const { sessionUser } = res.locals;

        const userRatings = await ratingsDao.findUserRatings(sessionUser.id);
        const canDeleteRating = userRatings.some(r => r.id === id);

        if (canDeleteRating) {
            await ratingsDao.removeRating(id);
            logger.info(`Removing rating ${id} by user ${sessionUser.id}`);
            return res.sendStatus(200);
        } else {
            return res.sendStatus(400);
        }
    } catch (err) {
        logger.error(err);
        next(err);
    }
});

ratingsHandler.patch('/rating/:id', securedPath, async (req, res, next) => {
    try {
        const { id } = validateData<{ id: string }>(IdSchema, req.params);

        const rating = await ratingsDao.findRating(id);
        if (!rating) {
            return res.sendStatus(400);
        }

        const { mechanics, performance, communication, comment } = validateData<Rating>(RatingUpdateSchema, req.body);
        const { player, author } = rating;

        logger.info(`Updating rating ${id} by user ${author}`);

        await ratingsDao.removeRating(id);
        await ratingsDao.saveRating({
            id,
            author, player,
            mechanics, performance, communication, comment
        });

        return res.sendStatus(200);
    } catch (err) {
        logger.error(err);
        next(err);
    }
});