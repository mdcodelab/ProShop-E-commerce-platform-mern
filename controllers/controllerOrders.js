import mongoose from "mongoose";
import Order from "../models/ordersModel.js";
import Product from "../models/productModel.js";
import {calcPrices} from "../utils/calcPrices.js";
import {verifyPayPalPayment, checkIfNewTransaction} from "../utils/paypal.js";

//create new order
//POST /api/orders
//private
// const  addOrderItems = async (req, res) => {
//     const{
//         orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice,
//         shippingPrice, totalPrice}=req.body;

//     if(orderItems && orderItems.length === 0) {
//         res.status(400).json({message: "No order items"});
//     } else {
//         const order = await Order.create({
//             user: req.user._id,
//             orderItems: orderItems.map((x) => ({...x, product: x._id, _id: undefined})),
//             shippingAddress,
//            paymentMethod,
//            itemsPrice,
//            taxPrice,
//            shippingPrice,
//            totalPrice
//         })
//         const orderCreated = await order.save();
//         res.status(201).json({orderCreated})
//     }
    
// }

const addOrderItems = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({message: "No order."})
  } else {
    // NOTE: here we must assume that the prices from our client are incorrect.
    // We must only trust the price of the item as it exists in
    // our DB. This prevents a user paying whatever they want by hacking our client
    // side code - https://gist.github.com/bushblade/725780e6043eaf59415fbaf6ca7376ff

    // get the ordered items from our database
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    // map over the order items and use the price from our items from database
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );
      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    // calculate prices
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
};



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
// const updateOrderToPaid = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.paymentResult = {
//         //this stuff will come from PyPal (PayPal Developer Tools)
//         id: req.body.id,
//         status: req.body.status,
//         update_time: req.body.update_time,
//         email_address: req.body.email_address,
//       };
//       const updatedOrder = await order.save();
//       res.status(200).json(updatedOrder);
//     } else {
//       res.status(404).json({ message: "Order not found." });
//     }
//   } catch (error) {
//     console.error("Error updating order:", error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// };

const updateOrderToPaid = async (req, res) => {
  // NOTE: here we need to verify the payment was made to PayPal before marking
  // the order as paid
  const { verified, value } = await verifyPayPalPayment(req.body.id);
  if (!verified) {
    return res.status(400).json({ message: "Payment not verified" });
  }

  // check if this transaction has been used before
  const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
  if (!isNewTransaction) {
    return res.status(400).json({ message: "Transaction has been used before" });
  }

  const order = await Order.findById(req.params.id);

  if (order) {
    // check the correct amount was paid
    const paidCorrectAmount = order.totalPrice.toString() === value;
    if (!paidCorrectAmount) {
      return res.status(400).json({ message: "Incorrect amount paid" });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};




//update order to DELIVERED
//PUT api/orders/:id/deliver
//private admin
const  updateOrderToDelivered = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order) {
      order.isDelivered=true;
      order.deliveredAt= Date.now();
      const updateOrder = order.save();
      res.status(200).json(updateOrder);
    } else {
      res,status(404).json({message : "Not found."})
    }

}

//get all orders
//GET api/orders/
//private admin
const  getAllOrders = async (req, res) => {
    const orders = await Order.find({}).populate("user", "id name");
    res.status(200).json(orders);
}

export {addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getAllOrders}

