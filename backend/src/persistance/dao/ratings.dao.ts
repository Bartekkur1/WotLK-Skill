import { logger } from "../../util/logger";
import { PgDaoBase, RatingsDaoBase } from "../dao.types";
import { Rating, User } from "../types";

const queries = {
    saveRating: ({ id, player, author, mechanics, performance, communication, comment }: Rating) =>
        `INSERT INTO ratings (id, player, author, mechanics, performance, communication, comment)
            VALUES ('${id}', '${player}', '${author}', '${mechanics}', '${performance}', '${communication}', '${comment}');`,
    findRatingByPlayerId: (id: string) => `SELECT * FROM ratings INNER JOIN users ON author = users.id WHERE player = '${id}';`
};

export class RatingsDao extends PgDaoBase implements RatingsDaoBase {

    async saveRating(rating: Rating): Promise<void> {
        console.log(rating);
        await this.executeQuery<void>(queries.saveRating(rating), 'Failed to save rating!');
    }

    async findPlayerRatings(id: string): Promise<Rating[]> {
        const ratings = await this.executeQuery<Rating[]>(queries.findRatingByPlayerId(id), 'Failed to find ratings!');
        return ratings;
    }

}