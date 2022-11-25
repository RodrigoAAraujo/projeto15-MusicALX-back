import { ProductSchema } from '../models/productSchemas.js'

export default function productValidation(req, res, next){
    const body = req.body

    const {error} = ProductSchema.validate(body)

    if(error){
        res.status(400).send(error.details.map(detail => detail.message))
        return
    }

    next()
}