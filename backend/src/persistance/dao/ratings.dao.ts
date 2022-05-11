import { PgDaoBase, RatingsDaoBase } from "../dao.types";
import { CountQueryResult, Rating } from "../types";

const queries = {
    saveRating: ({ id, player, author, mechanics, performance, communication, comment }: Rating) =>
        `INSERT INTO ratings (id, player, author, mechanics, performance, communication, comment)
            VALUES ('${id}', '${player}', '${author}', '${mechanics}', '${performance}', '${communication}', '${comment}');`,
    findRatingByPlayerId: (id: string) => `SELECT users.username as userName, users.avatar as userAvatar, ratings.* FROM ratings 
                                            INNER JOIN users ON author = users.id WHERE player = '${id}';`,
    findRatingByAuthorId: (id: string) => `SELECT * FROM ratings WHERE author = '${id}'`,
    removeRatingById: (id: string) => `DELETE FROM ratings WHERE id = '${id}'`,
    findRatingById: (id: string) => `SELECT * FROM ratings WHERE id = '${id}'`
};

export class RatingsDao extends PgDaoBase implements RatingsDaoBase {

    async saveRating(rating: Rating): Promise<void> {
        console.log(rating);
        await this.executeQuery<void>(queries.saveRating(rating), 'Failed to save rating!');
    }

    async findPlayerRatings(id: string): Promise<Rating[]> {
        const result = await this.executeQuery<Rating>(queries.findRatingByPlayerId(id), 'Failed to find ratings!');
        return result.allResults();
    }

    async findUserRatings(userId: string): Promise<Rating[]> {
        const result = await this.executeQuery<Rating>(queries.findRatingByAuthorId(userId), 'Failed to find user ratings!');
        return result.allResults();
    }

    async removeRating(id: string): Promise<void> {
        await this.executeQuery<void>(queries.removeRatingById(id), 'Failed to remove rating!');
    }

    async findRating(id: string): Promise<Rating> {
        const result = await this.executeQuery<Rating>(queries.findRatingById(id), "Failed to find rating!");
        return result.singleResult();
    }

}