import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Row, Col, ListGroup, Image, Button, Card, FormControl} from "react-bootstrap";
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import {useDispatch, useSelector} from "react-redux";
import { addToCart, removeFromCart } from '../slices/cartSlice';

function CartScreen() {
    const cart = useSelector((state) => state.cart);
    const {cartItems}=cart;
    console.log(cartItems);

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const itemsNumber =cartItems.reduce((total, item) => total+item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.quantity*item.price, 0).toFixed(2);


    const addToCartHandler = async (product, quantity) => {
          dispatch(addToCart({item: product, quantity}))
    }

    const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
      navigate("/login?redirect=/shipping")
    }

  return (
    <Row>
      <Col md={8}>
        <h1 style={{marginBottom: "20px"}}>Shopping Cart</h1>
        {cartItems.length === 0 ? (<Message>Your Cart Is Empty <Link to="/">GoBack</Link></Message>) : (
            <ListGroup variant="flush">
                {cartItems.map((cartItem)=> {
                    return <ListGroup.Item key={cartItem._id}>
                        <Row>
                            <Col md={2}><Image src={cartItem.image} alt={cartItem.name} fluid rounded></Image></Col>
                            <Col md={3}><Link to={`/product/${cartItem._id}`}>{cartItem.name}</Link></Col>
                            <Col md={2}>${cartItem.price}</Col>
                            <Col md={2}>
                              <FormControl as="select" value={cartItem.quantity} 
                              onChange={(e)=>addToCartHandler(cartItem,  Number(e.target.value))}>
                        {[...Array(cartItem.countInStock).keys()].map((x) => {
                          return <option key={x+1} value={x+1}>{x+1}</option>
                        })}
                      </FormControl>
                            </Col>
                            <Col md={2}>
                            <Button type="button" variant="light">
                            <FaTrash onClick={()=>removeFromCartHandler(cartItem._id)}></FaTrash></Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                })}
            </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item><h2>Subtotal {itemsNumber} items</h2>
            ${totalPrice}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" className="btn-block" 
              disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed To Checkout</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
