import React from 'react';
import {Link} from "react-router-dom";
import FormContainer from "../components/FormContainer";
import {Form, Button, Row, Col} from "react-bootstrap";

function LoginScreen() {
    const[email, setEmail]=React.useState("");
    const[password, setPassword]=React.useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("submit");
    }
  return (
    <FormContainer>
    <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId={email} className="my-3">
            <Form.Label>E-mail address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} 
            onChange={(e)=>setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId={password} className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} 
            onChange={(e)=>setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-2">Sign In</Button>
      </Form>
      <Row className="py-3">
        <Col>
            new Customer? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
