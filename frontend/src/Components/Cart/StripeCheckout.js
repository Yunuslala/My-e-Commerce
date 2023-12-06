import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from './Payment';

const StripeCheckout = () => {

    const url = "https://e-coomercebackend.onrender.com"
    const token = localStorage.getItem("meToken");
  const [clientSecret, setClientSecret] = useState("");
  const [clientPublish,setClientPublish]=useState("");
    const Dispatch=useDispatch();
  const getStripeKey = async (token) => {
    console.log("objectofStripe", token);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
   const payload={
        amount:1500,
    }
    const { data } = await axios.post(`${url}/api/v1/payment/stripe`,payload, {
        headers,
    });
    setClientSecret(data.clientSecret);
  };
  const getPublishKey = async (token) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const { data } = await axios.get(`${url}/api/v1/payment/stripe`,{
        headers,
    });
    setClientPublish(data.STRIPE_PUBLISH_KEY);
  };

  useEffect(() => {
    if (token) {
        getPublishKey(token)
      getStripeKey(token);
    }
  }, [token]);





  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div>
       {clientSecret && (
          <Elements stripe={loadStripe(clientPublish)} options={options}>
          <Payment />
          </Elements>
        )}
    </div>
  )
}

export default StripeCheckout
