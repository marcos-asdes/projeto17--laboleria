import { clientsRepository } from "../repositories/clientsRepository.js";

export async function registerClient(_req, res) {
    const { name, address, phone } = res.locals;
    try {
        await clientsRepository.insertRegisterClient(name, address, phone);
        console.log("Client registered successfully");
        res.sendStatus(201);
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal error");
    }
}