import { PgDaoBase, PlayersDaoBase } from "../dao.types";
import { CountQueryResult, Player, Realm } from "../types";

const queries = {
    savePlayer: ({ id, name, realm }: Player) => `INSERT INTO players (id, name, realm) VALUES ('${id}', '${name}', '${realm}');`,
    countPlayerByNameAndRealm: (name: string, realm: string) => `SELECT COUNT(*) FROM players WHERE name = '${name}' AND realm = '${realm}';`,
    selectPlayerByNameAndRealm: (name: string, realm: string) => `SELECT * FROM players WHERE name = '${name}' AND realm = '${realm}';`,
    selectPlayerById: (id: string) => `SELECT * FROM players WHERE id = '${id}';`,
    searchPlayersByName: (name: string) => `SELECT * FROM players WHERE LOWER(name) LIKE '%${name}%' LIMIT 10;`
};

export class PlayersDao extends PgDaoBase implements PlayersDaoBase {


    async findPlayerById(id: string): Promise<Player> {
        const result = await this.executeQuery<Player>(queries.selectPlayerById(id), "Failed to fetch player!");
        return result.singleResult();
    }

    async findPlayer(name: string, realm: Realm): Promise<Player> {
        const result = await this.executeQuery<Player>(queries.selectPlayerByNameAndRealm(name, realm), "Failed to fetch player!");
        return result.singleResult();
    }

    async playerExists(name: string, realm: Realm): Promise<boolean> {
        const result = await this.executeQuery<CountQueryResult>(queries.countPlayerByNameAndRealm(name, realm), "Failed to fetch player!");
        return Number(result.singleResult().count) >= 1;
    }

    async savePlayer(player: Player): Promise<void> {
        await this.executeQuery<void>(queries.savePlayer(player), "Failed to save player!");
    }

    async searchPlayerName(name: string): Promise<Player[]> {
        const result = await this.executeQuery<Player>(queries.searchPlayersByName(name.toLowerCase()), "Failed search players!");
        return result.allResults();
    }

}