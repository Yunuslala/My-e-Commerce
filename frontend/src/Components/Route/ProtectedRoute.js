import React from 'react';
import { useSelector } from 'react-redux';
import {  useNavigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {loginSucess,LoginUser}=useSelector((state)=>state.AuthSlice);
    console.log("log",loginSucess,LoginUser);
    const token=localStorage.getItem("meToken")
  const navigate=useNavigate();
  if (!token) {
   navigate('/login')
  }
 

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
