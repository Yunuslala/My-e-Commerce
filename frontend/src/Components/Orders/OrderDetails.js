import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import Loader from '../Layouts/Loader/Loader';
import { GetSingleOrder } from '../Redux/Reducers/ProductSlices/OrderSlice';
import { Typography } from '@mui/material';
import "./OrderDetails.css"

const OrderDetails = () => {
    const {IndividualOrder,loading,error}=useSelector((state)=>state.OrderSlice);
    const token=localStorage.getItem("meToken");
  const { loginSucess, LoginUser } = useSelector((state) => state.AuthSlice);


    const params=useParams();
    console.log("paramsId",params)
    const Dispatch=useDispatch();
    useEffect(()=>{
        if(token){
            Dispatch(GetSingleOrder({token,id:params?.id}))
        }
    },[params])
  return (
   <Fragment>
    {
        loading? (<Loader/>) : (
            <Fragment>
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{IndividualOrder && IndividualOrder._id}
              </Typography>
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

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
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
        </Fragment>
        )
    }
   </Fragment>
  )
}

export default OrderDetails
