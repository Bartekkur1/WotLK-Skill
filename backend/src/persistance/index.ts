import { PgDatabaseClient } from "../shared/pgClient";
import { UsersDao } from "./dao/users/users";

const dbConnection = new PgDatabaseClient();

export const usersDao = new UsersDao(dbConnection);