import { Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CartItemCard from './CartItemCard';
import { useSelector, useDispatch } from "react-redux";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { UpdateCartQuantity, getUserCartData, removeFromCart } from '../Redux/Reducers/ProductSlices/Cart.slice';
import "./Cart.css"
import { toast } from 'react-toastify';
import Loader from '../Layouts/Loader/Loader';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const Cart = () => {
  const {loginSucess,LoginUser}=useSelector((state)=>state.AuthSlice);
  const {cartData,loading,message}=useSelector((store)=>store.CartSlice);
  const Dispatch=useDispatch();

  const token=localStorage.getItem("meToken");

  const [flag,setFlag]=useState(false);
  const navigate=useNavigate();
  if(!token){
    navigate('/login')
  }
  useEffect(()=>{
    Dispatch(getUserCartData({token}))
  },[])
  useEffect(()=>{
    console.log("objectof message",message);
    if(message){
     const sucess=(msg)=> toast.success(
        msg,
        {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 2000, // Auto-close the toast after 5000 milliseconds (5 seconds)
          hideProgressBar: false, // Show the progress bar
          className: "custom-toast", // Custom class for styling
        }
      );
      sucess(message);
    }
  },[Dispatch,message])
  const HandleQuanitity=(type,Quantity,CartId,ItemId,Stock)=>{
    if (type == "incre") {
      console.log("stockQuant",Stock,Quantity);
      if (Stock <= Quantity) {
        return toast.error(
          `This Product has only ${Stock} stock`,
          {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 2000, // Auto-close the toast after 5000 milliseconds (5 seconds)
            hideProgressBar: false, // Show the progress bar
            className: "custom-toast", // Custom class for styling
          }
        );
      } else {
        const payload={
          Quantity:Quantity+1,
          CartId,ItemId
        }
       Dispatch(UpdateCartQuantity({payload,token}))
      }
    } else {
      if (1 >= Quantity) {
        return;
      } else {
        const payload={
          Quantity:Quantity-1,
          CartId,ItemId
        }
       Dispatch(UpdateCartQuantity({payload,token}))
      }
    }
  }
  
  const checkoutHandler=()=>{
    navigate('/shipping')
  }
 
  const deleteCartItems=(id)=>{
    setFlag((prev)=>!prev);
    const payload={
      ItemId:id
    }
    Dispatch(removeFromCart({token,payload}))
  }
  return (
    <Fragment>
    {
      cartData.length==0 ? (
        <Fragment>
        <div className="EmptyCart">
    <ShoppingCartIcon />

    <Typography>Your Cart is empty </Typography>
    <Link to="/products">Add Some</Link>
  </div>
        </Fragment>
      ) : (
        <Fragment>
    {
      loading? (<Loader />) : (
        <Fragment>
      {cartData?.items?.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartData?.items?.length &&
              cartData?.items?.map((item) => (
                <div key={item?._id} className='cartContainer'>
                <CartItemCard item={item}  deleteCartItems={deleteCartItems} />
                <div className='cartInput'>
                <button onClick={() => HandleQuanitity("incre",item?.quantity,cartData?._id,item?._id,item?.productId?.Stock)}>+</button>
                  <input type="Number" value={item?.quantity} />
                  <button onClick={() => HandleQuanitity("decre",item?.quantity,cartData?._id,item?._id,item?.productId?.Stock)}>-</button>

                </div>
                <p className="cartSubtotal">
                {`₹${item?.quantity*item?.productId?.price}`}
                </p>
                </div>
              )
              )}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartData?.items?.reduce(
                  (acc, item) => acc + item?.quantity * item?.productId?.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
      )
    }
  </Fragment>
      )
    }

    </Fragment>
 
   
  );
}

export default Cart
