import joi from "joi";

export const ProductSchema = joi.object({
    product: joi.string(3).max(30).min(3).required(),
    seller: joi.string(3).max(20).required(),
    type: joi.string().required(),
    qtd: joi.number().min(1).required(),
    value: joi.string().min(3).required(),
    image: joi.string().required(),
    copy: joi.string().min(10).max(400).required()
})