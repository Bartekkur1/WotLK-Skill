import { User } from "../../types";

export default {
    saveUser: ({ id, username, avatar, locale }: User) => `INSERT INTO users (id, username, avatar, locale) VALUES ('${id}', '${username}', '${avatar}', '${locale}');`,
    selectUserById: (id: string) => `SELECT COUNT(*) FROM users WHERE id = '${id}';`,
}