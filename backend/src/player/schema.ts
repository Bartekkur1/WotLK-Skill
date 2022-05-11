import Joi from "joi";
import { realms } from "../persistance/types";

export const PlayerSchema = Joi.object({
    name: Joi.string().not().empty().label('player name').required(),
    realm: Joi.string().valid(...realms).required()
});

export const NameSearchSchema = Joi.object({
    name: Joi.string().not().empty().label('player name').required()
});