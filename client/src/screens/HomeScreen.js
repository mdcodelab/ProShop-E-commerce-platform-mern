import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetAllProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams, Link } from "react-router-dom";
import PaginationComponent from "../components/PaginationComponent";
import ProductCarousel from "../components/ProductCarousel";

function HomeScreen() {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error } = useGetAllProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link className="btn-light mb-4" to="/">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data.message || error.error}</Message>
      ) : (
        <>
          <h1 className="text-center py-2">Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="d-flex m-auto">
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <PaginationComponent key={pageNumber} numberPages={data.numberPages} currentPage={data.page}
            keyword={keyword || ""}
/>
        </>
      )}
    </>
  );
}

export default HomeScreen;
