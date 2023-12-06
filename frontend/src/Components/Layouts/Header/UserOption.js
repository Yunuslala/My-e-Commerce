import React, { useState } from 'react'
import SpeedDial from '@mui/material/SpeedDial';
// import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import "./Header.css"
import profileImage from "../../../images/Profile.png"
import { useDispatch } from 'react-redux';
import { Logout } from '../../Redux/Reducers/UserSlices/Auth.Slice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Backdrop from '@mui/material/Backdrop';

const UserOption = ({LoginUser}) => {
    const Navigate=useNavigate();
    const [open,setOpen]=useState(false);
    const Dispatch=useDispatch();

    const orders=()=>{
        Navigate('/orders/me')

    }
    const logoutUser=()=>{
        localStorage.setItem("meToken","");
        Dispatch(Logout())
        const LogoutToast = () => {
            toast.success("Logout Sucessfull", {
              position: toast.POSITION.TOP_LEFT,
              autoClose: 3000, // Auto-close the toast after 5000 milliseconds (5 seconds)
              hideProgressBar: false, // Show the progress bar
              className: "custom-toast", // Custom class for styling
            });
          };
          LogoutToast();
          window.location.reload();
    }
    const account=()=>{
      Navigate('/account')
    }
    const cart=()=>{
        Navigate('/Cart')
    }
    const dashboard=()=>{
      Navigate('/admin/dashboard')
    }
    console.log("UserDetail",LoginUser);
  
    const options=[
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
          icon: (
            <ShoppingCartIcon
            //   style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
            />
          ),
          name: `Cart`,
          func: cart,
        },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ]
    if (LoginUser.role === "admin") {
        options.unshift({
          icon: <DashboardIcon />,
          name: "Dashboard",
          func: dashboard,
        });
      }
  return (
    <div>
    <Backdrop open={open} style={{ zIndex: "10" }} />
    <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={LoginUser.avatar ? LoginUser.avatar  :  profileImage }
            alt="Profile"
          />
        }
      >
         {options.map((item) => (
          <SpeedDialAction
             key={item._id}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>

     
      <ToastContainer />
    </div>
  )
}

export default UserOption
