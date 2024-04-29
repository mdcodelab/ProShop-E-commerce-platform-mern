import React from 'react';
import FormContainer from '../components/FormContainer';
import {Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import { saveShippingAddress } from '../slices/cartSlice';
import {useNavigate} from "react-router-dom";

function ShippingScreen() {
     const cart  = useSelector((state) => state.cart || {});
     const { shippingAddress } = cart;

    const[address, setAddress]=React.useState(shippingAddress?.address || "");
    const [city, setCity] = React.useState(shippingAddress?.city || "");
    const [postalCode, setPostalCode] = React.useState(shippingAddress?.postalCode || "");
    const [country, setCountry] = React.useState(shippingAddress?.country || "");

    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        navigate("/payment");
    }


  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter address" value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="Enter city" value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control type="text" placeholder="Enter postal code" value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" placeholder="Enter country" value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-2">Continue</Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen
