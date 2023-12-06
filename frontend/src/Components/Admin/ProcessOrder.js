import React, { Fragment, useEffect, useState } from 'react'
import SideBar from './SideBar'
import Loader from '../Layouts/Loader/Loader'
import { Button, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { ClearMessage, GetSingleOrder, UpdateOrderStatus, clearSucess } from '../Redux/Reducers/ProductSlices/OrderSlice'
import { ToastContainer, toast } from 'react-toastify'
const ProcessOrder = () => {
    const {IndividualOrder,loading,error,sucess,msg}=useSelector((state)=>state.OrderSlice);
    const token=localStorage.getItem("meToken");
  const { loginSucess, LoginUser } = useSelector((state) => state.AuthSlice);
  const [status,setStatus]=useState("")
    const params=useParams();
    console.log("paramsId",params)
    const Dispatch=useDispatch();
    useEffect(()=>{
        if(token){
            Dispatch(GetSingleOrder({token,id:params?.id}));
            Dispatch(clearSucess());
            Dispatch(ClearMessage());
        }
    },[params])
    const updateOrderSubmitHandler=(e)=>{
      e.preventDefault()
      const  payload={
        status
      }
      Dispatch(UpdateOrderStatus({token,payload,id:IndividualOrder?._id}));
      if(sucess){
        const suces=()=>{
          toast.success(msg,{
            position: toast.POSITION.TOP_LEFT,
            autoClose: 2000, // Auto-close the toast after 5000 milliseconds (5 seconds)
            hideProgressBar: false, // Show the progress bar
            className: 'custom-toast', // 
          })
        }
        suces();
        Dispatch(clearSucess());
        Dispatch(ClearMessage());
        window.location.reload();
      }
    }
  return (
    <Fragment>
    <div className="dashBoard">
      <SideBar />
      <div className="newProductContainer">
        {loading ? (
          <Loader />
        ) : (
          <div
            className="confirmOrderPage"
            style={{
              display: IndividualOrder?.orderStatus=== "Delivered" ? "block" : "grid",
            }}
          >
            <div>
              <div className="confirmshippingArea">
                <Typography>Shipping Info</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name:</p>
                    <span>{IndividualOrder?.UserId && IndividualOrder?.UserId?.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>
                    {IndividualOrder?.shippingInfo && IndividualOrder?.shippingInfo.phoneNo}
                  </span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>
                    {IndividualOrder?.shippingInfo &&
                      `${IndividualOrder?.shippingInfo.address}, ${IndividualOrder?.shippingInfo.city}, ${IndividualOrder?.shippingInfo.state}, ${IndividualOrder?.shippingInfo.pinCode}, ${IndividualOrder?.shippingInfo.country}`}
                  </span>
                  </div>
                </div>

                <Typography>Payment</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                  <p
                    className={
                      IndividualOrder?.paymentInfo &&
                      IndividualOrder?.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {IndividualOrder?.paymentInfo &&
                    IndividualOrder?.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                  </div>

                  <div>
                    <p>Amount:</p>
                    <span>{IndividualOrder?.totalPrice && IndividualOrder?.totalPrice}</span>
                  </div>
                </div>

                <Typography>Order Status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                  <p
                    className={
                        IndividualOrder?.orderStatus && IndividualOrder?.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {IndividualOrder?.orderStatus && IndividualOrder?.orderStatus}
                  </p>
                  </div>
                </div>
              </div>
              <div className="confirmCartItems">
                <Typography>Your Cart Items:</Typography>
                <div className="confirmCartItemsContainer">
                {IndividualOrder?.orderItems &&
                    IndividualOrder?.orderItems?.CartId?.items.map((item) => (
                    <div key={item?.productId?._id}>
                    <img
                      src={item?.productId?.images[0]?.image}
                      alt={item.productId._id}
                    />
                      <Link to={`/product/${item?.productId?._id}`}>
                        {item?.productId?.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₹{item?.productId?.price} ={" "}
                        <b>₹{item?.productId?.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/*  */}
            <div
              style={{
                display: IndividualOrder?.orderStatus === "Delivered" ? "none" : "block",
              }}
            >
              <form
                className="updateOrderForm"
                onSubmit={(e)=>updateOrderSubmitHandler(e)}
              >
                <h1>Process Order</h1>

                <div>
                  <AccountTreeIcon />
                  <select onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Choose Category</option>
                    {IndividualOrder?.orderStatus === "Processing" && (
                      <option value="Shipped">Shipped</option>
                    )}

                    {IndividualOrder?.orderStatus === "Shipped" && (
                      <option value="Delivered">Delivered</option>
                    )}
                  </select>
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={
                    loading ? true : false || status === "" ? true : false
                  }
                >
                  Process
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
    <ToastContainer />
  </Fragment>
  )
}

export default ProcessOrder
