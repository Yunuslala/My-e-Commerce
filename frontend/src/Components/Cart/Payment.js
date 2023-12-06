import React, { Fragment, useEffect, useRef, useState } from "react";
import CheckoutSteps from "./CheckOutStep";
import { Typography } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Payment.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { CreateOrder } from "../Redux/Reducers/ProductSlices/OrderSlice";
const Payment = () => {
  const { LoginUser, loginSucess } = useSelector((state) => state.AuthSlice);
  const url = "https://e-coomercebackend.onrender.com"
  const { cartData } = useSelector((state) => state.CartSlice);
  const token = localStorage.getItem("meToken");
  const navigate = useNavigate();
  const shippingInfo = JSON.parse(localStorage.getItem("ShippingInfo"));
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const Dispatch = useDispatch();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      };
      const { data } = await axios.post(
        `${url}/api/v1/payment/stripe`,
        paymentData,
        { headers }
      );

      const client_secret = data.clientSecret;
      console.log("ofClientSec", client_secret);
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: LoginUser?.name,
            email: LoginUser?.email,
            address: {
              line1: shippingInfo?.address,
              city: shippingInfo?.city,
              state: shippingInfo?.state,
              postal_code: shippingInfo?.pinCode,
              country: shippingInfo?.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        return toast.error(result.error.message, {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 2000, // Auto-close the toast after 5000 milliseconds (5 seconds)
          hideProgressBar: false, // Show the progress bar
          className: "custom-toast", // Custom class for styling
        });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          const payload = {
            shippingInfo,
            orderItems: { "CartId": cartData?._id },
            paymentInfo: {
              id: result?.paymentIntent?.id,
              status: result?.paymentIntent?.status,
            },
            itemsPrice:orderInfo?.itemsPrice,
            taxPrice:orderInfo?.taxPrice,
            shippingPrice:orderInfo?.shippingPrice,
            totalPrice:orderInfo?.totalPrice,
          };
          
          Dispatch(CreateOrder({token,payload}));
          navigate('/sucess')
        }else{
            return toast.error(`There's some issue while processing payment`, {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 2000, // Auto-close the toast after 5000 milliseconds (5 seconds)
                hideProgressBar: false, // Show the progress bar
                className: "custom-toast", // Custom class for styling
              });
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      return toast.error(error.response.message, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000, // Auto-close the toast after 5000 milliseconds (5 seconds)
        hideProgressBar: false, // Show the progress bar
        className: "custom-toast", // Custom class for styling
      });
    }
  };

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     if (!stripe) {
  //       return;
  //     }

  //     const clientSecret = new URLSearchParams(window.location.search).get(
  //       "payment_intent_client_secret"
  //     );

  //     if (!clientSecret) {
  //       return;
  //     }

  //     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
  //       switch (paymentIntent.status) {
  //         case "succeeded":
  //           setMessage("Payment succeeded!");
  //           break;
  //         case "processing":
  //           setMessage("Your payment is processing.");
  //           break;
  //         case "requires_payment_method":
  //           setMessage("Your payment was not successful, please try again.");
  //           break;
  //         default:
  //           setMessage("Something went wrong.");
  //           break;
  //       }
  //     });
  //   }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };
  return (
    <Fragment>
      <CheckoutSteps activeStep={2} />

      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo?.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>

      <ToastContainer />
    </Fragment>
  );
};

export default Payment;
