import { logger } from "../../../util/logger";
import { CountQueryResult, PgDaoBase, User, UsersDaoBase } from "../../types";
import queries from './queries';

export class UsersDao extends PgDaoBase implements UsersDaoBase {

    async usersExists(id: string): Promise<boolean> {
        const result = await this.runQuery<CountQueryResult>(queries.selectUserById(id), "Failed to fetch user!");
        return Number(result.count) >= 1;
    }

    async saveUser(user: User): Promise<void> {
        try {
            const usersExists = await this.usersExists(user.id);
            if (usersExists) {
                return;
            }

            await this.runQuery<void>(queries.saveUser(user), "Failed to save user!");
        } catch (err) {
            logger.error(err);
            throw new Error('Failed to save user!');
        }
    }

}