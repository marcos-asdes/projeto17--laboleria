import { Router } from "express";

// import { validateClient, checkClientId } from "../middlewares/clientMiddleware.js";
// import { registerClient, getClientOrder } from "../controllers/clientController.js";

import { validateClient } from "../middlewares/clientMiddleware.js";
import { registerClient } from "../controllers/clientController.js";

const clientRouter = Router();

// Router().method(address, middleware, controller);
clientRouter.post("/clients", validateClient, registerClient);
// clientRouter.get("/clients/:id/orders", checkClientId, getClientOrder);

export default clientRouter;