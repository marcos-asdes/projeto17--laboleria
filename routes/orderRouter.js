import { Router } from "express";

import { validateOrder, checkClientAndCakeIds, checkDate, checkAnyDateExists, checkOrderId } from "../middlewares/orderMiddleware.js";
import { registerOrder, getOrdersByDate, getOrdersByClientId, getOrders } from "../controllers/orderController.js";

const orderRouter = Router();

// Router().method(address, middleware, controller);
orderRouter.post("/order", validateOrder, checkClientAndCakeIds, registerOrder);
orderRouter.get("/orders", checkDate, getOrdersByDate); // query: date
orderRouter.get("/orders", checkAnyDateExists, getOrders);
orderRouter.get("/orders/:id", checkOrderId, getOrdersByClientId); // params: id

export default orderRouter;