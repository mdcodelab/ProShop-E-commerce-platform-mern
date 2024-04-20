import express from "express";
const router = express.Router();
import {getAllProducts, getProduct} from "../controllers/controllerProducts.js"

router.route("/").get(getAllProducts);
router.route("/:id").get(getProduct);


export default router;