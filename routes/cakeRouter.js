import { Router } from "express";

// import { validateCake, cakeAlreadyExist } from "../middlewares/cakeMiddleware.js";
// import { cakeRecipe } from "../controllers/cakeController.js";

const cakesRouter = Router();

// Router().method(address, middleware, controller);
// cakesRouter.post("/cakes", validateCake, cakeAlreadyExist, cakeRecipe);

export default cakesRouter;