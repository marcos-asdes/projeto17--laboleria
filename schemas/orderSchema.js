import Joi from 'joi';

const orderSchema = Joi.object({
    quantity: Joi.number().integer().min(1).max(5).required(),
});

export { orderSchema };