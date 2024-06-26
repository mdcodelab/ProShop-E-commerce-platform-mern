import dotenv from "dotenv";
dotenv.config();
import path from "path";
import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import { connectDB } from "./connectDB.js";
connectDB();
import routerProducts from "./routes/productRoutes.js";
import routerUsers from "./routes/userRoutes.js";
import routerOrders from "./routes/orderRoutes.js";
import routerUploads from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

// const __dirname = path.resolve(); //set __dirname as current durectory
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// app.use("/uploads", express.static("uploads"));
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));

//cookie parser middleware - allows us to access cookies
app.use(cookieParser());

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", routerProducts);
app.use("/api/users", routerUsers);
app.use("/api/orders", routerOrders);
app.use("/api/public/uploads", routerUploads);
app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

//entry point for the front-end: node server /localhost:4000
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(notFound);
app.use(errorHandler);


const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
