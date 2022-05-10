import { PgDatabaseClient } from "../shared/pgClient";
import { logger } from "../util/logger";
import { CountQueryResult, Player, Rating, Realm, User } from "./types";

export abstract class PgDaoBase {
    protected dbClient: PgDatabaseClient;

    constructor(connection: PgDatabaseClient) {
        this.dbClient = connection;
    }

    protected async executeQuery<T>(query: string, errorMessage: string) {
        try {
            const connection = await this.dbClient.getConnection();
            const { rows } = await connection.query<T>(query);
            connection.release();
            return rows[0];
        } catch (err) {
            logger.error(err, query);
            throw new Error(errorMessage);
        }
    }

    protected singleResult<T>(rows: T[]) {
        return rows[0];
    }

    protected countResults(rows: CountQueryResult[]) {
        return rows[0].count;
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
}