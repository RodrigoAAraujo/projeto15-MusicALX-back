import { ObjectId } from 'mongodb'
import { productsCollection } from '../database/db.js'

export async function sendProducts(req, res){
    const {type, name} = req.query

    try{
        if(type && name){
            const FilteredProducts = await productsCollection.find({type: type, name: name }).toArray()

            delete FilteredProducts.seller
            delete FilteredProducts.copy

            res.status(200).send(FilteredProducts)
            return
        }

        if(type){
            const TypeProducts = await productsCollection.find({type: type}).toArray()

            delete TypeProducts.seller
            delete TypeProducts.copy

            res.status(200).send(TypeProducts)
            return
        }

        if(name){
            const NameProducts = await productsCollection.find({name: name }).toArray()

            delete NameProducts.seller
            delete NameProducts.copy

            res.status(200).send(NameProducts)
            return
        }

        const UnfilteredProducts = await productsCollection.find({}).toArray()

        delete UnfilteredProducts.seller
        delete UnfilteredProducts.copy

        res.status(200).send(UnfilteredProducts)
        return

    }catch(err){
        res.status(500).send({message: err})
        return
    }
}

export async function sendSpecificProduct(req, res){
    const {idProduct} = req.params

    try{
        const specificProduct = await productsCollection.findOne({_id: ObjectId(idProduct)})

        if(!specificProduct){
            res.status(404).send("Produto não encontrado")
            return
        }

        res.status(200).send(specificProduct)
        return

    }catch(err){
        res.status(500).send({message: err})
        return
    }
}

export async function registerProduct(req, res){
    const {seller, qtd, product, type, value, image, copy} = req.body

    try{
        await productsCollection.insertOne({
            product,
            seller,
            type,
            qtd,
            value,
            image,
            copy
        })
        res.status(201).send("Produto Registrado")
        return
    }catch(err){
        res.status(500).send({message: err})
        return
    }
}