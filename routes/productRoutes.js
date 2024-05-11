import express from "express";
const router = express.Router();
import {getAllProducts, getProduct, createProduct, updateProduct, 
    deleteProduct, createProductReview} from "../controllers/controllerProducts.js";
import {protect, admin} from "../middlewares/authMiddleware.js";

router.route("/").get(getAllProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProduct).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
router.route("/:id/reviews").post(protect, createProductReview);


export default router;