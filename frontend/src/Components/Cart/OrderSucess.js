import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./OrderSucess.css";

import { Link } from "react-router-dom";
import { Typography } from '@mui/material';
const OrderSucess = () => {
  return (
    <div className="orderSuccess">
    <CheckCircleIcon />

    <Typography>Your Order has been Placed successfully </Typography>
    <Link to="/orders/me">View Orders</Link>
  </div>
  )
}

export default OrderSucess
