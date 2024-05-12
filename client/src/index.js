import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminRoute from "./components/AdminRoute";
import AdminOrderScreen from "./screens/AdminOrderScreen";
import AdminProductScreen from "./screens/AdminProductScreen";
import AdminUpdateProduct from "./screens/AdminUpdateProduct";
import AdminUserScreen from "./screens/AdminUserScreen";
import AdminUpdateUser from "./screens/AdminUpdateUser";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/products/:id" element={<ProductScreen></ProductScreen>}></Route>
      <Route path="/cart" element={<CartScreen></CartScreen>}></Route>
      <Route path="/login" element={<LoginScreen></LoginScreen>}></Route>
      <Route path="/register" element={<RegisterScreen></RegisterScreen>}></Route>
      <Route path="" element={<PrivateRoute></PrivateRoute>}>
        <Route path="/shipping" element={<ShippingScreen></ShippingScreen>}></Route>
        <Route path="/payment" element={<PaymentScreen></PaymentScreen>}></Route>
        <Route path="/placeOrder" element={<PlaceOrderScreen></PlaceOrderScreen>}></Route>
        <Route path="/orders/:id" element={<OrderScreen></OrderScreen>}></Route>
        <Route path="/profile" element={<ProfileScreen></ProfileScreen>}></Route>
      </Route>

      <Route path="" element={<AdminRoute></AdminRoute>}>
        <Route path="/admin/orderList" element={<AdminOrderScreen></AdminOrderScreen>}></Route>
        <Route path="/admin/productList" element={<AdminProductScreen></AdminProductScreen>}></Route>
        <Route path="/admin/productList/:pageNumber" element={<AdminProductScreen></AdminProductScreen>}></Route>
        <Route path="/admin/products/:id/edit" element={<AdminUpdateProduct></AdminUpdateProduct>}></Route>
        <Route path="/admin/userList" element={<AdminUserScreen></AdminUserScreen>}></Route>
        <Route path="/admin/users/:id/edit" element={<AdminUpdateUser></AdminUpdateUser>}></Route>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router}></RouterProvider>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
