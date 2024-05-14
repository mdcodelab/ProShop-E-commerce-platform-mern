import React from 'react';
import {Row, Col} from "react-bootstrap";
import Product from "../components/Product";
import { useGetAllProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams, Link } from 'react-router-dom';
import PaginationComponent from '../components/PaginationComponent';


function HomeScreen() {
  const {keyword, pageNumber}=useParams();
  const {data, isLoading, error}=useGetAllProductsQuery({keyword, pageNumber});
  //console.log(data); //products, page(current page), numberPages

{isLoading ? (<Loader/>) : error ? (<Message variant="danger">{error?.data.message || error.error}</Message>) : (
<>

</>)}


  return (
    <>
    {keyword && (<Link to="/" className="btn btn-light mb-4">Go Back</Link>)}
      {isLoading ? (<Loader></Loader>) : error ? (
        <div>{error?.data.message || error.error}</div>
      ) : (
        <>
          <h1 className="text-center">Latest Products</h1>
          <Row>
            {data.products.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id} className="d-flex m-auto">
                  <Product product={product}></Product>
                </Col>
              );
            })}
          </Row>

            <PaginationComponent numberPages={data.numberPages} currentPage={data.page} 
            keyword={keyword ? keyword : ""}></PaginationComponent>
        </>
      )}
    </>
  );
}

export default HomeScreen
