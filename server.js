import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import {connectDB} from "./connectDB.js";
connectDB();
import routerProducts from "./routes/productRoutes.js";
import {notFound, errorHandler} from "./middlewares/errorMiddleware.js";

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
})

app.use("/api/v1/products", routerProducts);
app.use(notFound);
app.use(errorHandler);

const port=process.env.PORT || 4000;

app.listen(port, () => {
console.log(`Server is listening at ${port}`)
})
