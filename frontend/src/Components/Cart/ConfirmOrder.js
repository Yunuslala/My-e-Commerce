import React, { Fragment, useEffect } from "react";
import CheckoutSteps from "./CheckOutStep";
import "./ConfirmOrder.css";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const { LoginUser, loginSucess } = useSelector((state) => state.AuthSlice);
  const { cartData } = useSelector((state) => state.CartSlice);
  const token = localStorage.getItem("meToken");
  const navigate = useNavigate();
  const shippingInfo = JSON.parse(localStorage.getItem("ShippingInfo"));

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [loginSucess]);
  const subtotal = cartData?.items?.reduce(
    (acc, item) => acc + item.quantity * item.productId.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.pinCode}, ${shippingInfo?.country}`;
  const proceedToPayment = async () => {
    const data = {
      itemsPrice: subtotal,
      shippingPrice: shippingCharges,
      taxPrice: tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };
  return (
    <Fragment>
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name</p>
                <span>{LoginUser?.name}</span>
              </div>
              <div>
                <p>Phone</p>
                <span>{shippingInfo?.phoneNo}</span>
              </div>
              <div>
                <p>Address</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartData?.items &&
                cartData?.items.map((item) => (
                  <div key={item._id}>
                    <img
                      src={item?.productId?.images[0]?.image}
                      alt={item.productId._id}
                    />
                    <Link to={`/product/${item?.productId?._id}`}>
                      {item?.productId?.name}
                    </Link>
                    <span>
                      {item?.quantity} X ₹{item?.productId?.price} =
                      <b>₹{item?.quantity * item?.productId?.price}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
              <div className="orderSummaryTotal">
                <p>
                  <b>Total:</b>
                </p>
                <span>₹{totalPrice}</span>
              </div>
            </div>
            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
