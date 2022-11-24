import { usersCollection } from '../database/db'
import { ProductSchema } from '../models/productSchemas'

export default async function productValidation(req, res, next){
    const body = req.body

    const {error} = ProductSchema.validate(body)

    if(error){
        res.status(400).send(error.details.map(detail => detail.message))
        return
    }

    try{
        const sellerExist = await usersCollection.findOne({name: body.seller})

        if(!sellerExist){
            res.status(401).send("Vendedor não está registrado")
            return
        }

        next()
    }catch(err){
        res.status(500).send({message: err})
        return
    }
}