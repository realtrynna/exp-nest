import joi from "joi";

export const validationEnv = joi.object({
    PORT: joi.string().required(),
    BASE_URL: joi.string().required().uri(),
    EMAIL_SERVICE: joi.string().required(),
    EMAIL_USER: joi.string().required(),
    EMAIL_PASS: joi.string().required(),
});
