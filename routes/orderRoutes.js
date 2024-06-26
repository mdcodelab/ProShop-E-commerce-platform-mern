import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
} from "../controllers/controllerOrders.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getAllOrders);
router.route("/myOrders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
