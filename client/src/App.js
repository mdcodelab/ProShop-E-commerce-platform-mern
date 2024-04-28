import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Header></Header>
      <main className="py-3">
        <Container>
          {isHomePage && <h1 className="text-center">Welcome to ProShop</h1>}
          <Outlet></Outlet>
        </Container>
      </main>
      <Footer></Footer>
      <ToastContainer position="top-center" toastStyle={{ textAlign: "center" }}
      />
    </>
  );
}

export default App;
