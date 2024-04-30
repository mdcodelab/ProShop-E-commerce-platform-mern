import mongoose from "mongoose";
import Order from "../models/ordersModel.js";

//create new order
//POST /api/orders
//private
const addOrderItems = async (req, res) => {
    res.send("Add order ");
}

//get logged in user's orders - able to get the id via cookie
//GET /api/orders/myOrders
//private
const getMyOrders = async (req, res) => {
    res.send("Get my orders");
}

//get order by id
//GET api/orders/:id
//private admin
const  getOrderById = async (req, res) => {
    res.send("Get order by id");
}

//update order to PAID
//PUT api/orders/:id/pay
//private
const  updateOrderToPaid = async (req, res) => {
    res.send("Update order to paid");
}

//update order to DELIVERED
//PUT api/orders/:id/deliver
//private admin
const  updateOrderToDelivered = async (req, res) => {
    res.send("Update order to delivered");
}

//get all orders
//GET api/orders/
//private admin
const  getAllOrders = async (req, res) => {
    res.send("Get all orders");
}

export {addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getAllOrders}

