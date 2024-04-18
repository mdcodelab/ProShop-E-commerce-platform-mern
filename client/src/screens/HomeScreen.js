import React from 'react';
import {Row, Col} from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";


function HomeScreen() {
  const[products, setProducts]=React.useState([]);

  React.useEffect(() => {
const getAllProducts = async () => {
  const {data} = await axios.get("/api/v1/products");
  setProducts(data);
}
getAllProducts();
  }, [])


  return (
    <>
     <h1 className="text-center">Latest Products</h1> 
     <Row>
        {products.map((product) => {
            return <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product}></Product>
            </Col>
        })}
     </Row>
    </>
  )
}

export default HomeScreen
