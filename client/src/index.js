import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import store from "./store";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import "./assets/styles/bootstrap.custom.css"
import './assets/styles/index.css';
import App from './App';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen></ProductScreen>}></Route>
    </Route>
  )
);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
