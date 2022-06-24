import Joi from 'joi';

const cakeSchema = Joi.object({
    name: Joi.string().min(2).required(),
    price: Joi.number().required(),
    description: Joi.string(),
    image: Joi.string().uri().required()
});

export { cakeSchema };