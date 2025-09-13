import { Router } from "express";
import { addOrder, getOrders, getOrderById, updateOrderById, deleteOrderById } from "../controller/order.controller.js";

const router = Router()
router.route("/add-order").post(addOrder)
router.route("/orders").get(getOrders)
router.route("/orders/:id").get(getOrderById)
router.route("/orders/update/:id").put(updateOrderById)
router.route("/orders/delete/:id").delete(deleteOrderById)

export default router