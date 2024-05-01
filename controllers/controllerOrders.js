import mongoose from "mongoose";
import Order from "../models/ordersModel.js";

//create new order
//POST /api/orders
//private
const  addOrderItems = async (req, res) => {
    const{
        orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice,
        shippingPrice, totalPrice}=req.body;

    if(orderItems && orderItems.length === 0) {
        res.status(400).json({message: "No order items"});
    } else {
        const order = await Order.create({
            user: req.user._id,
            orderItems: orderItems.map((x) => ({...x, product: x._id, _id: undefined})),
            shippingAddress,
           paymentMethod,
           itemsPrice,
           taxPrice,
           shippingPrice,
           totalPrice
        })
        const orderCreated = await order.save();
        res.status(201).json({orderCreated})
    }
    
}


//get logged in user's orders - able to get the id via cookie
//GET /api/orders/myOrders
//private
const getMyOrders = async (req, res) => {
    const orders = await Order.find({user: req.user._id});
    res.status.json(orders);
}

//get order by id
//GET api/orders/:id
//private admin
const  getOrderById = async (req, res) => {
    const order = await Order.findOneById(req.params.id).populate("user", "name email")
    res.send("Get order by id");
    if(order) {
        res.status(200).json(order);
    } else {
        res.status(404).json({message: "Order not found."});
    }
}


//update order to PAID
//PUT api/orders/:id/pay
//private
const  updateOrderToPaid = async (req, res) => {
    res.send("Update order items") 
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

