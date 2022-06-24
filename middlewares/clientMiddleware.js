import { clientSchema } from "../schemas/clientSchema.js";

export async function validateClient(req, res, next) {
    const { name, address, phone } = req.body;
    try {
        const validate = clientSchema.validate({ name, address, phone }, { abortEarly: false });
        if (validate.error) {
            return res.status(400).send({
                message: "Validation error",
                detail: validate.error.details.map((e) => e.message).join(', ')
            });
        }
        res.locals.name = name;
        res.locals.address = address;
        res.locals.phone = phone;
        console.log("Validation parameters met");
        next();
    } catch (e) {
        console.log("Error: " + e.message);
        next();
    }
}

//export async function checkClientId(req, res, next) {}