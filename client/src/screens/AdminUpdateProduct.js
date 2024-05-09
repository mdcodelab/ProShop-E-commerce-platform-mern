import React from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {toast} from "react-toastify";
import { useGetProductQuery } from '../slices/productsApiSlice';
import { useUpdateProductMutation } from '../slices/productsApiSlice';


function AdminUpdateProduct() {
const {id: _id}=useParams(); //product id
const[name, setName]=React.useState("");
const[price, setPrice] = React.useState("");
const[image, setImage] = React.useState("");
const[description, setDescription] = React.useState("");
const[brand, setBrand] = React.useState("");
const[category, setCategory] = React.useState("");
const[countInStock, setCountInStock] = React.useState("");

const {data: product, isLoading, error, refetch}=useGetProductQuery(_id); //product id
const[updateProduct, {isLoading: isLoadingUpdate}]=useUpdateProductMutation();
const navigate=useNavigate();
console.log(product);

//fill the forms with product details
// React.useEffect(() => {
//   setName(product.name);
//   setPrice(product.price);
//   setImage(product.image);
//   setDescription(product.description);
//   setBrand(product.brand);
//   setCategory(product.category);
//   setCountInStock(product.contInStock);
// }, [product])

const submitHandler = async (e) => {
e.preventDefault();

const updateProd={
_id, name, price, image, brand, category, countInStock, description}

const result = await updateProduct(updateProd);
console.log(result);
if(result.error) {
  toast.error(result.error);
} else {
toast.success("Updated successfully.");
navigate("/admin/productList");
}
}

  return (
    <>
      <Link to="/admin/productList" className="btn btn-light my-3">Go Back</Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {isLoadingUpdate && (<Loader></Loader>)}
        {isLoading ? (<Loader></Loader>) : error ? (<Message variant="danger">{error}</Message>) : (
          <Form onSubmit = {submitHandler}>
            <Form.Group className="my-2">
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)}
                placeholder="Enter name..."></Form.Control>
            </Form.Group>

            <Form.Group className="my-2">
              <Form.Label>Price:</Form.Label>
              <Form.Control type="number" id="price" value={price} onChange={(e)=>setPrice(e.target.value)}
                placeholder="Enter price..."></Form.Control>
            </Form.Group>

            {/* IMAGE INPUT PLACEHOLDER */}

            <Form.Group className="my-2">
              <Form.Label>Image:</Form.Label>
              <Form.Control type="text" id="image" value={image} onChange={(e)=>setImage(e.target.value)}
                placeholder="Enter image..."></Form.Control>
            </Form.Group>

            <Form.Group className="my-2">
              <Form.Label>Brand:</Form.Label>
              <Form.Control type="text" id="brand" value={brand} onChange={(e)=>setBrand(e.target.value)}
                placeholder="Enter brand..."></Form.Control>
            </Form.Group>

            <Form.Group className="my-2">
              <Form.Label>Cont In Stock:</Form.Label>
              <Form.Control type="number" id="contInStock" value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}
                placeholder="Enter stock..."></Form.Control>
            </Form.Group>

            <Form.Group className="my-2">
              <Form.Label>Category:</Form.Label>
              <Form.Control type="text" id="category" value={category} onChange={(e)=>setCategory(e.target.value)}
                placeholder="Enter category..."></Form.Control>
            </Form.Group>

            <Form.Group className="my-2">
              <Form.Label>Description:</Form.Label>
              <Form.Control type="text" id="category" value={description} onChange={(e)=>setDescription(e.target.value)}
                placeholder="Enter description..."></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="btn-sm my-2" 
            style={{backgroundColor: "black"}}>UPDATE</Button>
          </Form>
        )}

      </FormContainer>
    </>
  )
}

export default AdminUpdateProduct
