import { sign, verify, decode } from 'jsonwebtoken';
import { User } from '../../persistance/types';
import { v4 } from 'uuid';
import { logger } from '../../util/logger';
import { JwtPayload } from '../types';

export const createToken = ({ id, username, avatar, locale }: User) => {
    return sign(
        {
            id,
            username,
            seed: v4()
        },
        process.env.JWT_SECRET || "setyoursecretpls");
};

export const verifyToken = (token: string): JwtPayload => {
    try {
        return verify(token, process.env.JWT_SECRET || "setyoursecretpls") as JwtPayload;
    } catch (err) {
        logger.error(err);
        throw new Error();
    }
};

export const decodeToken = (token: string) => {

};