import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import {products} from "./data/dataProducts.js";

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
})

app.get("/api/products", (req,res) => {
    res.json(products)
})

app.get("/api/v1/products/:id", (req, res) => {
    const product=products.find(p => p._id === req.params.id);
    res.json(product)
})

const port=process.env.PORT || 4000;

app.listen(port, () => {
console.log(`Server is listening at ${port}`)
})
