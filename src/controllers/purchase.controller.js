import { ObjectId } from "mongodb";
import { productsCollection, purchasesCollection, sessionsCollection } from "../database/db.js";

export async function createPurchase(req, res) {
    const {user} = req.headers
    const cart = req.body

    if(!user){
        res.status(401).send("Sem e-mail do comprador")
    }

    try {
        const ids = cart.map((p) => p.id)
        const qtd = cart.map((p) => p.qtd)

        for(let i = 0; i< ids.length; i++){
            const qtd_Product =  await productsCollection.findOne({ _id: ObjectId(ids[i]) });

            if(!qtd_Product){
                res.status(404).send("Produto não cadastrado")
            }

            if(!qtd_Product.qtd){
                await productsCollection.deleteOne({_id: ObjectId(ids[i])})
                return res.status(202).send("Item nã mais disponível")
            }

            if (Number(qtd_Product.qtd) === Number(qtd[i])){
                await productsCollection.deleteOne({_id: ObjectId(ids[i])})
            }else if( Number(qtd_Product.qtd) >  Number(qtd[i])){
                await productsCollection.updateOne({_id: ObjectId(ids[i])}, {$set: {qtd: Number(qtd_Product.qtd) - Number(qtd[i]) }})
            }else{
                res.status(400).send("Quantidade inválida")
                return
            }

        }

        await purchasesCollection.insertOne({cart, buyer: user});
        return res.status(201).send({ message: "Pagamento efetuado com sucesso!" });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: err })
    }
}