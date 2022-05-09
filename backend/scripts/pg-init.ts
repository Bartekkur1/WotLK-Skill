import { PgDatabaseClient } from "../src/shared/pgClient";
import { logger } from "../src/util/logger";

const queries = [
    {
        name: "create users table",
        query: `CREATE TABLE IF NOT EXISTS users (
            id varchar(20) NOT NULL,
            username varchar(128) NOT NULL,
            avatar varchar(48) NOT NULL,
            locale varchar(16) NOT NULL,
            PRIMARY KEY (id)
        )`
    },
    {
        name: "create players table",
        query: `CREATE TABLE IF NOT EXISTS players (
            id varchar(36) NOT NULL,
            name varchar(128) NOT NULL,
            realm varchar(64) NOT NULL,
            PRIMARY KEY (id)
        )`
    }
];

(async () => {
    logger.info('Starting pg init...')
    const dbClient = new PgDatabaseClient();
    const connection = await dbClient.getConnection();

    logger.info('Executing query...');

    for (let { name, query } of queries) {
        logger.info(`Executing query ${name}`);
        await connection.query(query);
    }

    connection.release();

    logger.info('Closing connection...')
    await dbClient.disconnect();
})();