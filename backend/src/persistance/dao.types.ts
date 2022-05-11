import { PgDatabaseClient } from "../shared/pgClient";
import { logger } from "../util/logger";
import { Player, Rating, Realm, User } from "./types";

export interface ResultHandlers<T> {
    singleResult: () => T;
    allResults: () => T[];
}

export abstract class PgDaoBase {
    protected dbClient: PgDatabaseClient;

    constructor(connection: PgDatabaseClient) {
        this.dbClient = connection;
    }

    protected async executeQuery<T>(query: string, errorMessage: string): Promise<ResultHandlers<T>> {
        try {
            const connection = await this.dbClient.getConnection();
            const { rows } = await connection.query<T>(query);
            connection.release();

            return {
                singleResult: () => rows[0] as T,
                allResults: () => rows as T[]
            };
        } catch (err) {
            logger.error(err, query);
            throw new Error(errorMessage);
        }
    }
}

export interface UsersDaoBase {
    usersExists(id: string): Promise<boolean>;
    saveUser(user: User): Promise<void>;
}

export interface PlayersDaoBase {
    playerExists(name: string, realm: Realm): Promise<boolean>;
    findPlayer(name: string, realm: Realm): Promise<Player>;
    savePlayer(player: Player): Promise<void>;
}

export interface RatingsDaoBase {
    saveRating(rating: Rating): Promise<void>;
    findPlayerRatings(playerId: string): Promise<Rating[]>;
    findUserRatings(userId: string): Promise<Rating[]>;
    removeRating(id: string): Promise<void>;
    findRating(id: string): Promise<Rating>;
}