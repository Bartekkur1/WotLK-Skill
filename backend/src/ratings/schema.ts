import Joi from "joi";

export const RatingSchema = Joi.object({
    player: Joi.string().uuid().required(),
    mechanics: Joi.number().min(0).max(10).required(),
    performance: Joi.number().min(0).max(10).required(),
    communication: Joi.number().min(0).max(10).required(),
    comment: Joi.string()
});