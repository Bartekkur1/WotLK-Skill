import { logger } from "../../util/logger";
import { PgDaoBase, UsersDaoBase } from "../dao.types";
import { CountQueryResult, User } from "../types";

const queries = {
    saveUser: ({ id, username, avatar, locale }: User) => `INSERT INTO users (id, username, avatar, locale) VALUES ('${id}', '${username}', '${avatar}', '${locale}');`,
    selectUserById: (id: string) => `SELECT COUNT(*) FROM users WHERE id = '${id}';`,
};

export class UsersDao extends PgDaoBase implements UsersDaoBase {

    async usersExists(id: string): Promise<boolean> {
        const result = await this.executeQuery<CountQueryResult>(queries.selectUserById(id), "Failed to fetch user!");
        return Number(result.singleResult().count) >= 1;
    }

    async saveUser(user: User): Promise<void> {
        try {
            const usersExists = await this.usersExists(user.id);
            if (usersExists) {
                return;
            }

            await this.executeQuery<void>(queries.saveUser(user), "Failed to save user!");
        } catch (err) {
            logger.error(err);
            throw new Error('Failed to save user!');
        }
    }

}