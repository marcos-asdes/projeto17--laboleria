import { orderSchema } from "../schemas/orderSchema.js";
import { cakesRepository } from "../repositories/cakesRepository.js";
import { clientsRepository } from "../repositories/clientsRepository.js";

export async function validateOrder(req, res, next) {
    const { quantity } = req.body;
    try {
        const validate = orderSchema.validate({ quantity }, { abortEarly: false });
        if (validate.error) {
            return res.status(400).send({
                message: "Validation error",
                detail: validate.error.details.map((e) => e.message).join(', ')
            });
        }
        res.locals.name = quantity;
        console.log("Validation parameters met");
        next();
    } catch (e) {
        console.log("Error: " + e.message);
        next();
    }
}

export async function checkClientAndCakeIds(req, res, next) {
    const { clientId, cakeId } = req.body;
    try {
        const checkCakeIdAlreadyExist = await cakesRepository.selectCakeById(cakeId);
        if (!checkCakeIdAlreadyExist.rows.length > 0) {
            return res.status(404).send({
                message: "Cake recipe does not exist",
                detail: "Enter a valid cakeId",
            });
        }
        const checkClientIdAlreadyExist = await clientsRepository.selectClientById(clientId);
        if (!checkClientIdAlreadyExist.rows.length > 0) {
            return res.status(404).send({
                message: "Client does not exist",
                detail: "Enter a valid clientId",
            });
        }
        res.locals.clientId = clientId;
        res.locals.cakeId = cakeId;
        console.log("clientId and cakeId validated");
        next();
    } catch (e) {
        console.log("Error: " + e.message);
        next();
    }
}