import { Player } from "../../types";

export default {
    savePlayer: ({ id, name, realm }: Player) => `INSERT INTO players (id, name, realm) VALUES ('${id}', '${name}', '${realm}');`,
    countPlayerByNameAndRealm: (name: string, realm: string) => `SELECT COUNT(*) FROM players WHERE name = '${name}' AND realm = '${realm}';`,
    selectPlayerByNameAndRealm: (name: string, realm: string) => `SELECT * FROM players WHERE name = '${name}' AND realm = '${realm}';`,
    selectPlayerById: (id: string) => `SELECT * FROM players WHERE id = '${id}';`
}