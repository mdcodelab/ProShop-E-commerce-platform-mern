import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import {connectDB} from "./connectDB.js";
connectDB();
import routerProducts from "./routes/productRoutes.js";
import routerUsers from "./routes/userRoutes.js";
import routerOrders from "./routes/orderRoutes.js";
import {notFound, errorHandler} from "./middlewares/errorMiddleware.js";

//cookie parser middleware - allows us to access cookies
app.use(cookieParser());

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("API is running...");
})

app.use("/api/products", routerProducts);
app.use("/api/users", routerUsers);
app.use("/api/orders", routerOrders);
app.use(notFound);
app.use(errorHandler);

const port=process.env.PORT || 4000;

app.listen(port, () => {
console.log(`Server is listening at ${port}`)
})
