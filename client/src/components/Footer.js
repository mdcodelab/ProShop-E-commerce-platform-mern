import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import {Link} from "react-router-dom";
import { FaFacebook, FaTelegram, FaCcPaypal} from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaMapLocation } from "react-icons/fa6";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";



function Footer() {
    const currentYear=new Date().getFullYear();

  return (
    <footer className="pt-4 text-white" style={{ backgroundColor: "black", marginTop: "3rem" }}>
      <Container>
        <Row>
          <Col sm={5}>
            <h6 className="">ProShop</h6>
            <p style={{ color: "rgb(192,192,192)", fontSize: "0.8rem" }} className="py-2">
              Our electronics store offers a wide range of high-quality products
              to meet all your tech needs. From the latest smartphones and
              tablets to cutting-edge laptops and desktop computers, we have
              everything to keep you connected and productive.
            </p>
            <Row>
              <Col>
                <FaFacebook className="icon"></FaFacebook>
              </Col>
              <Col>
                <AiFillTwitterCircle className="icon"></AiFillTwitterCircle>
              </Col>
              <Col>
                <FaTelegram className="icon"></FaTelegram>
              </Col>
            </Row>
          </Col>
          <Col sm={3}>
            <h6>Useful links</h6>
            <Row className="py-1">
              <Link to="/" style={{ color: "rgb(192,192,192)", fontSize: "0.85rem" }} className="link">Home</Link>
            </Row>
            <Row className="py-1">
              <Link to="/profile" style={{ color: "rgb(192,192,192)", fontSize: "0.85rem" }} className="link">My Profile</Link>
            </Row>
            <Row className="py-1">
              <Link to="/placeOrder" style={{ color: "rgb(192,192,192)", fontSize: "0.85rem" }} className="link">My Orders</Link>
            </Row>
            <Row className="py-1">
              <Link style={{ color: "rgb(192,192,192)", fontSize: "0.85rem" }} className="link">Terms & Conditions</Link>
            </Row>
          </Col>
          <Col sm={4}>
            <h6>Contact</h6>
            <Container
              className="py-1" style={{ color: "rgb(192,192,192)", fontSize: "0.85rem" }}>
              <FaMapLocation className="icon icon-contact"></FaMapLocation> 1500
              22th Street Sacramento CA 95888
            </Container>
            <Container className="py-1" style={{ color: "rgb(192,192,192)", fontSize: "0.85rem" }}>
              <AiOutlineMail className="icon icon-contact"></AiOutlineMail>{" "}
              contact@proshop.com
            </Container>
            <Container className="py-1" style={{ color: "rgb(192,192,192)", fontSize: "0.85rem" }}>
              <MdOutlinePhoneInTalk className="icon icon-contact"></MdOutlinePhoneInTalk>{" "}
              (916) 653 3555
            </Container>
            <Container className="py-1" style={{ color: "rgb(192,192,192)", fontSize: "0.85rem" }}>
              <FaCcPaypal className="icon icon-contact"></FaCcPaypal> Pay with
              PyPal
            </Container>
          </Col>
        </Row>

        <Row className="text-center py-2">
          <p style={{ fontSize: "0.85rem" }}>ProShop &copy; {currentYear}</p>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer
