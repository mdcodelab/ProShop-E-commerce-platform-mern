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


//get logged in user's orders - able to get the id via cookie. It will display orders by the user
//GET /api/orders/myOrders
//private
const getMyOrders = async (req, res) => {
    const orders = await Order.find({user: req.user._id});
    res.status(200).json(orders);
}

//get order by id
//GET api/orders/:id
//private admin
const  getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email")
    if(order) {
        res.status(200).json(order);
    } else {
        res.status(404).json({message: "Order not found."});
    }
}


//update order to PAID
//PUT api/orders/:id/pay
//private
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        //this stuff will come from PyPal (PayPal Developer Tools)
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found." });
    }
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};



//update order to DELIVERED
//PUT api/orders/:id/deliver
//private admin
const  updateOrderToDelivered = async (req, res) => {
    const order = await findById(req.params.id);
}

//get all orders
//GET api/orders/
//private admin
const  getAllOrders = async (req, res) => {
    const orders = await Order.find({}).populate("user", "id name");
    res.status(200).json(orders);
}

export {addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getAllOrders}

