import React from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {Row, Col, Image, Card, ListGroup, Button, FormControl} from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';

function ProductScreen() {
    const {id: productId}=useParams();
  
    const {data: product, isLoading, error}=useGetProductQuery(productId);
    const [quantity, setQuantity]=React.useState(1);
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const addToCartHandler = () => {
      dispatch(addToCart({item: product, quantity}));
      navigate("/cart");
    }


  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      {isLoading ? (<Loader/>) : error ? (<Message variant="danger">{error?.data?.message || error.error}</Message>) : (
        <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {/* Qty Select */}
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity</Col>
                    <Col>
                      <FormControl as="select" value={quantity} 
                      onChange={(e)=> setQuantity(Number(e.target.value))}>
                        {[...Array(product.countInStock).keys()].map((x) => {
                          return <option key={x+1} value={x+1}>{x+1}</option>
                        })}
                      </FormControl>
                      </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button className="btn-block"type="button" 
                disabled={product.countInStock >0 ? false: true} onClick={addToCartHandler}>Add To Cart</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      )}
 
    </>
  );
}

export default ProductScreen
