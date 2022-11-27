import { purchasesCollection, sessionsCollection } from "../database/db.js";

export async function createPurchase(req, res) {
    const { token, user } = req.body;

    try {
        cart = await sessionsCollection.findOne({ userId: user._id });
        await purchasesCollection.insertOne(cart);
        await sessionsCollection.deleteOne({ _id: cart._id });

        return res.status(201).send({ message: "Pagamento efetuado com sucesso!" });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: err })
    }
}