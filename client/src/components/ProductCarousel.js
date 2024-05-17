import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

function ProductCarousel() {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  console.log(products);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error.message}</Message>
      ) : (
        <Carousel pause="hover" className="bg-primary mb-4">
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/products/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid style={{ display: 'block', margin: '0 auto' }}/>
                <Carousel.Caption className="carousel-caption">
                    <h2>{product.name} ${product.price}</h2>

                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
}

export default ProductCarousel;
