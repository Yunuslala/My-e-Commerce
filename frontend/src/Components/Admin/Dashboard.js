import React, { useEffect } from 'react'
import SideBar from './SideBar'
import {  Typography } from '@mui/material'
import { Line,Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import "./Dashboard.css"
import { Chart as Chartjs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AdminProducts } from '../Redux/Reducers/ProductSlices/Product.slice';
import { AllExistUser } from '../Redux/Reducers/UserSlices/Auth.Slice';
import { getAllOrders } from '../Redux/Reducers/ProductSlices/OrderSlice';

Chartjs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  let totalAmount=2500;

  const token=localStorage.getItem("meToken");
  const Dispatch=useDispatch();
  const {Alluser}=useSelector((store)=>store.AuthSlice);
  const {AllOrders}=useSelector((store)=>store.OrderSlice);
  const {AllProducts}=useSelector((store)=>store.ProductSlice);
  useEffect(()=>{
    Dispatch(AdminProducts({token}));
    Dispatch(AllExistUser({token}));
    Dispatch(getAllOrders({token}));
  },[])
  {
    AllOrders && AllOrders.forEach(element => {
      totalAmount+=Number(element.totalPrice)
      
    });
  }
  let outOfStock=0;
  {
    AllProducts && AllProducts.forEach(element => {
     if(element.Stock==0){
      outOfStock++;
     }
      
    });
  }
  const data = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  // Chart configuration
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock,AllProducts.length-outOfStock],
      },
    ],
  };
  const options = {
    scales: {
      x: {
        type: 'category', // Ensure the x-axis is treated as a category scale
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='dashBoard'>
      <SideBar />
      <div className='DashBoardContainer'>
      <Typography component="h1">Dashboard</Typography>
      <div className='DashBoardSummary'>
      <div>
      <p>
      Total Amount <br /> ₹{totalAmount}
      </p>
        
      </div>
      <div className='DashBoardSummaryBox2'> 
      <Link to="/admin/orders">
      <p>Orders</p>
      <p>{AllOrders?.length}</p>
      </Link>
      <Link to="/admin/Products">
      <p>Products</p>
      <p>{AllProducts?.length}</p>
      </Link>
      <Link to="/admin/Users">
      <p>Users</p>
      <p>{Alluser?.length}</p>
      </Link>
      </div>

      </div>
      <div className='LineChart'>
      <Line data={data}  />
      </div>
      <div className='DonughtChart'>
      <Doughnut data={doughnutState} />
      </div>
      </div>
     
    </div>
  )
}

export default Dashboard
