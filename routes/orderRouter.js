import { Router } from "express";

// import { validateOrder, checkClientAndCakeId, checkDate, checkClientId } from "../middlewares/orderMiddleware.js";
// import { registerOrder, getOrdersByDate, getOrdersByClientId } from "../controllers/orderController.js";

const orderRouter = Router();

// Router().method(address, middleware, controller);
// orderRouter.post("/order", validateOrder, checkClientAndCakeId, registerOrder);
// orderRouter.get("/orders", checkDate, getOrdersByDate);
// orderRouter.get("/orders/:id", checkClientId, getOrdersByClientId);

export default orderRouter;