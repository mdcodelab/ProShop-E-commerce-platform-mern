import React from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import {useDispatch, useSelector} from "react-redux";
import { savePaymentMethod } from '../slices/cartSlice';  //bring here to save on localStorage
import {useNavigate} from "react-router-dom";
import {Form, Button, Col} from "react-bootstrap";
import FormContainer from '../components/FormContainer';


function PaymentScreen() {
  const [paymentMethod, setPaymentMethod]=React.useState("PayPal");

  const cart = useSelector(state => state.cart);
  const {shippingAddress}=cart;
  console.log(shippingAddress);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(()=> {
    if(shippingAddress.address === "" || shippingAddress.city === "" || shippingAddress.postalCode === "" || shippingAddress.county) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeOrder")
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check type="radio" className="my-2" label="PayPal or Credit Card" 
            id="PayPal" value={paymentMethod} name="paymentMethod" checked 
            onChange={(e)=> setPaymentMethod(e.target.value)}></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
