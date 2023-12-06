import React from 'react'
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './NotFound.css'
const NotFound = () => {
  return (
    <div className="NotFound">
    <Typography>404 URI Not Found </Typography>
    <Link to="/">Return Home</Link>
  </div>
  )
}

export default NotFound
