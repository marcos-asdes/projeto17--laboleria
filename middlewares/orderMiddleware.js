import { orderSchema } from "../schemas/orderSchema.js";
import { cakesRepository } from "../repositories/cakesRepository.js";
import { clientsRepository } from "../repositories/clientsRepository.js";
import { ordersRepository } from "../repositories/ordersRepository.js";

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
        res.locals.quantity = quantity;
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

export async function checkDate(req, res, next) {
    let date = req.params.date;
    if (date.length===10) date = req.params.date; // "orders/YYYY-MM-DD"
    else if (date.length>10) date = req.params.date.slice(5); // "orders/date=YYYY-MM-DD"
    try {
        const allDates = await ordersRepository.selectDates();
        let checkDate = false;
        for (let i=0; i<allDates.rows.length; i++) {
            const auxDate = allDates.rows[i].createdAt.toISOString().slice(0,10);
            if (auxDate===date) {
                checkDate = true;
            }
        }
        if (!checkDate) {
            return res.status(404).send({
                message: "No order found",
                detail: "Enter a valid date, remember to use query string in the format date=YYYY-MM-DD",
            });
        }
        res.locals.date = date;
        console.log("There is an order for the date in query string");
        next();
    } catch (e) {
        console.log("Error: " + e.message);
        next();
    }
}

export async function checkAnyDateExists(_req, res, next) {
    try {
        const checkAnyDateExistsInDB = await ordersRepository.selectDates();
        if (!checkAnyDateExistsInDB.rows.length > 0) {
            return res.status(404).send({
                message: "No order found",
                detail: "There are no order records in the database",
            });
        }
        console.log("There are order records in the database");
        next();
    } catch (e) {
        console.log("Error: " + e.message);
        next();
    }    
}