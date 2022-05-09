import { PgDatabaseClient } from "../shared/pgClient";
import { PlayersDao } from "./dao/player";
import { UsersDao } from "./dao/users";

const dbConnection = new PgDatabaseClient();

export const usersDao = new UsersDao(dbConnection);
export const playersDao = new PlayersDao(dbConnection);