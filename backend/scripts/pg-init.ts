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
    },
    {
        name: "create ratings table",
        query: `CREATE TABLE IF NOT EXISTS ratings (
            id varchar(36) NOT NULL,
            player varchar(36) NOT NULL,
            author varchar(36) NOT NULL,
            mechanics decimal NOT NULL,
            performance decimal NOT NULL,
            communication decimal NOT NULL,
            comment text NOT NULL,
            PRIMARY KEY (id)
        )`
    },
    {
        name: "create ratings relation to player",
        query: "ALTER TABLE ratings ADD FOREIGN KEY (\"player\") REFERENCES \"players\" (\"id\");"
    },
    {
        name: "create ratings relation to author",
        query: "ALTER TABLE ratings ADD FOREIGN KEY (\"author\") REFERENCES \"users\" (\"id\");"
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