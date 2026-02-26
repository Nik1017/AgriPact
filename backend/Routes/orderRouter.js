import express from "express";
import { createOrder, deleteOrder, getAllOrders, getUserOrders, updateOrderStatus } from "../Controllers/orderController.js";
import isAuthenticate from "../Middlewares/auth.js";

const orderRouter = express.Router();

orderRouter.post("/create", isAuthenticate, createOrder);
orderRouter.get("/allorders", isAuthenticate, getAllOrders);
orderRouter.get("/myorders", isAuthenticate, getUserOrders);
orderRouter.put("/update/:id", isAuthenticate, updateOrderStatus);
orderRouter.delete("/delete/:id", isAuthenticate, deleteOrder);

export default orderRouter;