import React from 'react';
import {Row, Col, Button, Table} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { useGetAllProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { FaEdit, FaTrash} from 'react-icons/fa';
import { useCreateProductMutation, useDeleteProductMutation } from '../slices/productsApiSlice';
import {toast} from "react-toastify";

function AdminProductScreen() {
    const{data: products, isLoading, error, refetch}=useGetAllProductsQuery();
    const [createProduct, {isLoading: loadingCreate}]=useCreateProductMutation();
    const [deleteProduct, { isLoading: deleteLoading }] = useDeleteProductMutation();

    const createProductHandler = async () => {
        if(window.confirm("Are you sure you want to create a new product?")) {
            try {
               await createProduct();
               refetch();
            } catch (err) {
               toast.error(err?.data?.message || err?.error); 
            }
        }
    }

    const deleteHandler = async (id) => {
        if(window.confirm("Are you sure?")) {
          try {
            await deleteProduct(id);
            toast.success("Product deleted.");
            refetch();
          } catch (err) {
            toast.error(err?.data?.message || err?.error)
          }
        }
    }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit></FaEdit> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && (<Loader></Loader>)}
      {deleteLoading && (<Loader></Loader>)}
      {isLoading ? <Loader></Loader> : error ? <Message variant="danger">{error}</Message> : (
        <>
            <Table striped hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                    <Button variant="light" className="btn-sm mx-2">
                                    <FaEdit></FaEdit></Button>
                                </LinkContainer>
                                <Button variant="danger" className="btn-sm" 
                                onClick={()=>deleteHandler(product._id)}><FaTrash style={{color: "white"}}></FaTrash></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
      )}
    </>
  );
}

export default AdminProductScreen