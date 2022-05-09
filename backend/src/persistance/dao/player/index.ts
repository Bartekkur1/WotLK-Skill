import { logger } from "../../../util/logger";
import { CountQueryResult, PgDaoBase, Player, PlayersDaoBase, Realm } from "../../types";
import queries from "./queries";

export class PlayersDao extends PgDaoBase implements PlayersDaoBase {


    async findPlayerById(id: string): Promise<Player> {
        return this.runQuery<Player>(queries.selectPlayerById(id), "Failed to fetch player!");
    }

    async findPlayer(name: string, realm: Realm): Promise<Player> {
        return this.runQuery<Player>(queries.selectPlayerByNameAndRealm(name, realm), "Failed to fetch player!");
    }

    async playerExists(name: string, realm: Realm): Promise<boolean> {
        const result = await this.runQuery<CountQueryResult>(queries.countPlayerByNameAndRealm(name, realm), "Failed to fetch player!");
        return Number(result.count) >= 1;
    }

    async savePlayer(player: Player): Promise<void> {
        await this.runQuery<void>(queries.savePlayer(player), "Failed to save player!");
    }

}