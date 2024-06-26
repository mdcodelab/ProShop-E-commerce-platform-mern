import React from 'react';
import {Outlet, Navigate} from "react-router-dom";
import { useSelector } from 'react-redux';

function PrivateRoute() {
    const {userInfo} = useSelector(state => state.auth);

  return (userInfo ? <Outlet></Outlet> : <Navigate to="/login" replace></Navigate>
  )
}

export default PrivateRoute
