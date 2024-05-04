import React from "react";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import {logout} from "../slices/authSlice";
import { toast } from "react-toastify";
import { resetCart } from "../slices/cartSlice";

function Header() {
  const { cartItems} = useSelector((state) => state.cart);
  const {userInfo}=useSelector(state => state.auth);
  const[logoutApiCall]=useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //console.log(cartItems);
  //console.log(userInfo);

  // Calculate total quantity of items in the cart
  const totalQuantity = cartItems && cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,0);

    const handleLogout = async () => {
      try {
        await logoutApiCall().unwrap();
        dispatch(logout());  //remove from localStorage
        //reset the cart when logout
        dispatch(resetCart());
        toast.success("Logout successfully.");
        navigate("/login")
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }

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
          <Nav className="ms-auto d-flex align-items-center">
            <LinkContainer to="/cart">
              <Nav.Link className="navLink">
                {cartItems && cartItems.length > 0 && (
                  <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                    {totalQuantity}
                  </Badge>
                )}
                <FaShoppingCart /> Cart
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (<NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>) 
            : (<LinkContainer to="/login">
              <Nav.Link className="navLink">
                <FaUser /> Sign In
              </Nav.Link>
            </LinkContainer>)}
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
