import React from 'react';
import {Table, Form, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';


function ProfileScreen() {
    const[name, setName]=React.useState("");
    const[email, setEmail]=React.useState("");
    const[password, setPassword]=React.useState("");
    const[confirmPassword, setConfirmPassword]=React.useState("");
    const dispatch=useDispatch();

    const {userInfo} = useSelector(state => state.auth); //get user information from the state

    //fill the name & the email
    React.useEffect(() => {
        if(userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo.name, userInfo.email]);

    const [updateUserProfile, {isLoading: loadingUpdateProfile}]=useProfileMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
          toast.error("Passwords do not march.");
        } else {
          try {
            const res = await updateUserProfile({_id:userInfo._id, name, email, password}).unwrap();
            dispatch(setCredentials(res));
            toast.success("Profile updated successfully.")
          } catch (err) {
            toast.error(err?.data?.message || err?.error)
          }
        }

    }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
            <Form.Group className="my-2">
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" value={name} id="name" placeholder="Enter name"
                onChange={(e)=> setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group className="my-2">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={email} id="email" placeholder="Enter email"
                onChange={(e)=> setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group className="my-2">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} id="password" placeholder="Enter password"
                onChange={(e)=> setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group className="my-2">
                <Form.Label>Conform password:</Form.Label>
                <Form.Control type="password" value={confirmPassword} id="confirmPassword" placeholder="Confirm password"
                onChange={(e)=> setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-2">Update</Button>
            {loadingUpdateProfile && (<Loader></Loader>)}
        </Form>
      </Col>
      <Col md={9}></Col>
    </Row>
  )
}

export default ProfileScreen
