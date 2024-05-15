import React from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { Row, Col, ListGroup, Image, Card, Button} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useAddOrderItemsMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import {toast} from "react-toastify";


function PlaceOrderScreen() {
  const cart = useSelector((state) => state.cart);
  const[addOrderItems, {isLoading, error}]=useAddOrderItemsMutation();
  console.log(addOrderItems);
  
const navigate=useNavigate();
const dispatch=useDispatch();
console.log(cart)

  // React.useEffect(() => {
  //   if (!cart.shippingAddress.address) {
  //     navigate("/shipping");
  //   } else if (!cart.paymentMethod) {
  //     navigate("/payment");
  //   }
  // }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await addOrderItems({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      console.log(res);
      navigate(`/orders/${res._id}`); //capture the id for the next page we navigate
      dispatch(clearCartItems());
    } catch (err) {
      console.log(err);
      console.error(err);
      toast.error("There is an error.");
    }
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
              </p>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Payment Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty.</Message>
              ) : (
                <ListGroup>
                  {cart.cartItems.map((x, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}><Image src={x.image} alt={x.name} rounded fluid></Image></Col>
                        <Col><Link to={`/product/${x._id}`}>{x.name}</Link></Col>
                        <Col md={4}>{x.quantity} x ${x.price} = {x.quantity} = ${x.quantity*x.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
              <ListGroup variant="flush">
                <ListGroup.Item><h2>Order Summary</h2></ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items:</Col>
                    <Col>${cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col>${cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Tax:</Col>
                    <Col>${cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Total:</Col>
                    <Col>${cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
              {error && (<Message variant="danger">{error}</Message>)}
            </ListGroup.Item>

              <ListGroup.Item>
                <Button type="button" className="btn-block" 
                disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>Place Order</Button>
                {isLoading && <Loader></Loader>}
              </ListGroup.Item>
              </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default PlaceOrderScreen;
