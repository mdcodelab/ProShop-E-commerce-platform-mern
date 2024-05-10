import express from "express";
const router = express.Router();
import {getAllProducts, getProduct, createProduct, updateProduct, deleteProduct} from "../controllers/controllerProducts.js";
import {protect, admin} from "../middlewares/authMiddleware.js";

router.route("/").get(getAllProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProduct).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);


export default router;