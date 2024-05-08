import express from "express";
const router = express.Router();
import {getAllProducts, getProduct, createProduct} from "../controllers/controllerProducts.js";
import {protect, admin} from "../middlewares/authMiddleware.js";

router.route("/").get(getAllProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProduct);


export default router;