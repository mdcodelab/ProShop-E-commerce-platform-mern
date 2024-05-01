import React from "react";
import { Link, useParams } from "react-router-dom";
import {Row, Col, ListGroup, Image, Form, Button, CardFooter,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";
//we are getting data from database

function OrderScreen() {
  const {id: orderId}=useParams(); 
  const {data: order, isLoading, error, refetch}=useGetOrderDetailsQuery(orderId);

  console.log(order);
  return <div>
  HELLO
  </div>;
}

export default OrderScreen;
