import React from 'react';
import {Container, Row, Column} from "react-bootstrap";

function Footer() {
    const currentYear=new Date().getFullYear();

  return (
    <footer>
        <Container>
            <Row className="text-center py-3">
                <p>ProShop &copy; {currentYear}</p>
            </Row>
        </Container>
      
    </footer>
  )
}

export default Footer
