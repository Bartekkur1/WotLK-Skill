import { ObjectSchema } from 'joi';

export class ValidationErrpr extends Error {
    private property: string;

    constructor(property: string, message: string) {
        super(message);
        this.property = property;
    }

    toJson() {
        const { property, message } = this;
        return {
            property,
            error: message
        };
    }
}

export const validateData = <T>(schema: ObjectSchema, data: any) => {
    const validationResult = schema.validate(data);
    const validationError = validationResult.error;
    if (validationError) {
        const { details } = validationError;
        const { message, path } = details[0];
        const property = path.join('.');
        throw new ValidationErrpr(property, message);
    }
    return validationResult.value as T;
};