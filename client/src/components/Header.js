import React from 'react';
import {Navbar, Nav, Container} from "react-bootstrap";
import {FaShoppingCart, FaUser} from "react-icons/fa";
import logo from "../assets/logo.png";
import {LinkContainer} from "react-router-bootstrap";

function Header() {
  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="md"
        collapseOnSelect
        className="py-3"
      >
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="logo"></img>ProShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
        </Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ width: "max-content" }}>
            <LinkContainer to="/cart">
              <Nav.Link>
                <FaShoppingCart></FaShoppingCart> Cart
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link><FaUser></FaUser> Sign in</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header
