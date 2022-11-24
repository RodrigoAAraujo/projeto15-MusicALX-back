import { usersCollection, sessionsCollection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

export async function signUp(req, res) {

    try {

    } catch (err) {

    }
}

export async function signIn(req, res) {
    const user = res.locals.user;
    const token = uuidV4();
    
    try {
        await sessionsCollection.insertOne({ token, userId: user._id });
        res.send({ token });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}