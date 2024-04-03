import React from 'react';
import {Navbar, Nav, Container} from "react-bootstrap";
import {FaShoppingCart, FaUser} from "react-icons/fa";
import logo from "../assets/logo.png"

function Header() {
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect className="py-3">
          <Container>
            <Navbar.Brand href="/"><img src={logo} alt="logo"></img>ProShop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
          </Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" style={{width: "max-content"}}>
              <Nav.Link href="/cart"><FaShoppingCart></FaShoppingCart> Cart</Nav.Link>
              <Nav.Link href="/login"><FaUser></FaUser> Sign in</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>   
    </header>
  )
}

export default Header
