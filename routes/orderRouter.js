import { Router } from "express";

// import { validateOrder, checkClientAndCakeIds, checkDate, checkAnyDateExists, checkClientId } from "../middlewares/orderMiddleware.js";
// import { registerOrder, getOrdersByDate, getOrdersByClientId, getOrders } from "../controllers/orderController.js";
import { validateOrder, checkClientAndCakeIds, checkDate } from "../middlewares/orderMiddleware.js";
import { registerOrder, getOrdersByDate } from "../controllers/orderController.js";


const orderRouter = Router();

// Router().method(address, middleware, controller);
orderRouter.post("/order", validateOrder, checkClientAndCakeIds, registerOrder);
orderRouter.get("/orders/:date", checkDate, getOrdersByDate);
// orderRouter.get("/orders", checkAnyDateExists, getOrders);
// orderRouter.get("/orders/:id", checkClientId, getOrdersByClientId);

export default orderRouter;