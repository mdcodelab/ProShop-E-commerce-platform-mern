import React from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import {Row, Col, ListGroup, Image, Card, Button} from "react-bootstrap";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function PlaceOrderScreen() {
  const cart = useSelector(state => state.cart);
  
  const navigate=useNavigate();
  React.useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping")
    } else if (!cart.paymentMethod) {
      navigate("/payment")
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate])


  return (
    <>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Row>
        <Col md={8}></Col>
        <Col md={4}></Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
