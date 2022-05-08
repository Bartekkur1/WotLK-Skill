import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export class PgDatabaseClient {

    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            ssl: {
                rejectUnauthorized: false
            }
        });
    }

    async getConnection() {
        return this.pool.connect();
    }

    async disconnect() {
        await this.pool.end();
    }
}