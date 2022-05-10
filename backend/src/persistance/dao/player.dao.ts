import { PgDaoBase, PlayersDaoBase } from "../dao.types";
import { CountQueryResult, Player, Realm } from "../types";

const queries = {
    savePlayer: ({ id, name, realm }: Player) => `INSERT INTO players (id, name, realm) VALUES ('${id}', '${name}', '${realm}');`,
    countPlayerByNameAndRealm: (name: string, realm: string) => `SELECT COUNT(*) FROM players WHERE name = '${name}' AND realm = '${realm}';`,
    selectPlayerByNameAndRealm: (name: string, realm: string) => `SELECT * FROM players WHERE name = '${name}' AND realm = '${realm}';`,
    selectPlayerById: (id: string) => `SELECT * FROM players WHERE id = '${id}';`
};

export class PlayersDao extends PgDaoBase implements PlayersDaoBase {


    async findPlayerById(id: string): Promise<Player> {
        return this.executeQuery<Player>(queries.selectPlayerById(id), "Failed to fetch player!");
    }

    async findPlayer(name: string, realm: Realm): Promise<Player> {
        return this.executeQuery<Player>(queries.selectPlayerByNameAndRealm(name, realm), "Failed to fetch player!");
    }

    async playerExists(name: string, realm: Realm): Promise<boolean> {
        const result = await this.executeQuery<CountQueryResult>(queries.countPlayerByNameAndRealm(name, realm), "Failed to fetch player!");
        return Number(result.count) >= 1;
    }

    async savePlayer(player: Player): Promise<void> {
        await this.executeQuery<void>(queries.savePlayer(player), "Failed to save player!");
    }

}