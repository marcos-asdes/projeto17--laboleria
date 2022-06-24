import urlExist from "url-exist";

import { cakeSchema } from "../schemas/cakeSchema.js";
import { cakesRepository }  from "../repositories/cakesRepository.js";

export async function validateCake(req, res, next) {
    const { name, price, description, image } = req.body
    try {
        if (!urlExist(image)){
            return res.status(422).send({
                message: "Invalid image link",
                detail: "Please enter a valid image link"
            });
        }
        const validate = cakeSchema.validate({ name, price, description, image }, { abortEarly: false });
        if (validate.error) {
            return res.status(400).send({
                message: "Validation error",
                detail: validate.error.details.map((e) => e.message).join(', ')
            });
        }
        if (price<=0) {
            return res.status(400).send({
                message: "Price not valid",
                detail: "The price value must be greater than zero"
            });
        }
        res.locals.name = name;
        res.locals.price = price;
        res.locals.description = description;
        res.locals.image = image;
        console.log("Validation parameters met");
        next();
    } catch (e) {
        console.log("Error: " + e.message);
        next();
    }
}

export async function cakeAlreadyExist(req, res, next) {
    try {
        const { name } = req.body;
        const checkCakeAlreadyExist = await cakesRepository.selectCakeByName(name);
        if (checkCakeAlreadyExist.rows.length > 0) {
            return res.status(409).send({
                message: "Cake already registered",
                detail: "Be sure to provide a valid cake recipe that does not match an already registered cake recipe",
            });
        }
        console.log("No duplicate cake recipe records in the database");
        next();
    } catch (e) {
        console.log("Error: " + e.message);
        next();
    }
}