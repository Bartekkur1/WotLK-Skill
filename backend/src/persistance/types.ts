import { PgDatabaseClient } from "../shared/pgClient";

export interface CountQueryResult {
    count: string;
}

export interface User {
    id: string;
    username: string;
    avatar: string;
    locale: string;
}

export abstract class PgDaoBase {
    protected dbClient: PgDatabaseClient;

    constructor(connection: PgDatabaseClient) {
        this.dbClient = connection;
    }
}

export interface UsersDaoBase {
    usersExists(id: string): Promise<boolean>;
    saveUser(user: User): Promise<void>;
}