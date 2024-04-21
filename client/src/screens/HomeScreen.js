import React from 'react';
import {Row, Col} from "react-bootstrap";
import Product from "../components/Product";
import { useGetAllProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';


function HomeScreen() {
  const {data:products, isLoading, error}=useGetAllProductsQuery();

{isLoading ? (<Loader/>) : error ? (<Message variant="danger">{error?.data.message || error.error}</Message>) : (
<>

</>)}


  return (
    <>
      {isLoading ? (<Loader></Loader>) : error ? (
        <div>{error?.data.message || error.error}</div>
      ) : (
        <>
          <h1 className="text-center">Latest Products</h1>
          <Row>
            {products.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product}></Product>
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
}

export default HomeScreen
