import { cakesRepository } from "../repositories/cakesRepository";

export async function postCakeRecipe(_req, res) {
    const { name, price, description, image } = res.locals;
    try {
        await cakesRepository.insertCakeRecipe(name, price, description, image);
        console.log("Cake recipe added successfully");
        res.sendStatus(201);
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal error");
    }
}