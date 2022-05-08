import { logger } from "../../../util/logger";
import { CountQueryResult, PgDaoBase, User, UsersDaoBase } from "../../types";
import queries from './queries';

export class UsersDao extends PgDaoBase implements UsersDaoBase {

    async usersExists(id: string): Promise<boolean> {
        try {
            const connection = await this.dbClient.getConnection();
            const { rows } = await connection.query<CountQueryResult>(queries.selectUserById(id));
            connection.release();
            return rows[0].count === '1';
        } catch (err) {
            logger.error(err);
            throw new Error('Failed to fetch user!');
        }
    }

    async saveUser(user: User): Promise<void> {
        try {
            const usersExists = await this.usersExists(user.id);
            if (usersExists) {
                return;
            }

            const connection = await this.dbClient.getConnection();
            await connection.query(queries.saveUser(user));
            connection.release();
        } catch (err) {
            logger.error(err);
            throw new Error('Failed to save user!');
        }
    }

}