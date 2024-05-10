import React from 'react';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../slices/usersApiSlice';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {toast} from "react-toastify";


function AdminUpdateUser() {
    const{id: userId}=useParams();
    const navigate=useNavigate();

    const {data: user, isLoading, error, refetch}=useGetUserByIdQuery(userId); //product id
const[updateUser, {isLoading: isLoadingUpdate}]=useUpdateUserMutation();

const [name, setName]=React.useState("");
const[email, setEmail]=React.useState("");
const[isAdmin, setIsAdmin]=React.useState(false);

//fill the forms
React.useEffect(() => {
if(user){
setName(user.name);
setEmail(user.email);
setIsAdmin(user.isAdmin);
}
}, [user]);

const submitHandler = async (e) => {
e.preventDefault();
try {
    await updateUser({userId, name, email, isAdmin});
    toast.success('User updated successfully.');
    refetch();
    navigate("/admin/userList")
} catch (err) {
    toast.error(err?.data?.message || err?.error);
}
}


  return (
    <>
      <Link to="/admin/userList" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {isLoadingUpdate && <Loader></Loader>}
        {isLoading ? (
          <Loader></Loader>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name..."
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email..."
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2">
              <Form.Label>Admin:</Form.Label>
              <Form.Check type="checkbox" label="Admin" 
              checked={isAdmin} onChange={(e)=>setIsAdmin(e.target.value)}/>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="btn-sm my-2"
              style={{ backgroundColor: "black" }}
            >
              UPDATE
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default AdminUpdateUser
