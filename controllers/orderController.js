import { ordersRepository } from "../repositories/ordersRepository.js";

export async function registerOrder(req, res) {
    const { clientId, cakeId, quantity } = res.locals;
    const { totalPrice } = req.body;
    const createdAt = new Date().toISOString().slice(0, 16).replace("T", " ");
    console.log(clientId, cakeId, quantity, totalPrice, createdAt);
    try {
        await ordersRepository.insertRegisterOrder(clientId, cakeId, quantity, totalPrice, createdAt);
        console.log("Order registered successfully");
        res.sendStatus(201);
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal error");
    }
}