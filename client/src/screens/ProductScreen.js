import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {Row, Col, Image, Card, ListGroup, Button, FormControl, Form} from "react-bootstrap";
import Rating from "../components/Rating";
import {useCreateProductReviewMutation, useGetProductQuery} from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { toast } from "react-toastify";
import Meta from "../components/Meta";

function ProductScreen() {
  const { id: productId } = useParams();

  const { data: product, isLoading, error } = useGetProductQuery(productId);
  console.log(product);
  const [quantity, setQuantity] = React.useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ item: product, quantity }));
    navigate("/cart");
  };

  const [createReview, { isLoading: isLoadingReview }] =
    useCreateProductReviewMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({productId, rating, comment}).unwrap();
      toast.success("Review submitted.");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  }

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name}></Meta>
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
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
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

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <FormControl
                            as="select"
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(Number(e.target.value))
                            }
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => {
                                return (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                );
                              }
                            )}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock > 0 ? false : true}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating}></Rating>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {isLoadingReview && <Loader></Loader>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating" className="my-2">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">Poor</option>
                          <option value="2">Fair</option>
                          <option value="3">Good</option>
                          <option value="4">Very Good</option>
                          <option value="5">Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="comment" className="my-2">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control as="textarea" value={comment} onChange={(e)=>setComment(e.target.value)}>
                      </Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary" disabled={isLoadingReview} >Submit</Button>
                    </Form>
                  ) : (
                    <Message><Link to="/login">Please log in to write a review</Link></Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ProductScreen;
