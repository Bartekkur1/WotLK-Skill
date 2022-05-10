import { PgDatabaseClient } from "../shared/pgClient";
import { PlayersDao } from "./dao/player.dao";
import { RatingsDao } from "./dao/ratings.dao";
import { UsersDao } from "./dao/users.dao";

const dbConnection = new PgDatabaseClient();

export const usersDao = new UsersDao(dbConnection);
export const playersDao = new PlayersDao(dbConnection);
export const ratingsDao = new RatingsDao(dbConnection);