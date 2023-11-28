
import React, { Fragment } from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import Loader from "../Layouts/Loader/Loader";

const CartItemCard = ({ item, deleteCartItems }) => {

  return (
    <>
    {
      item && <Fragment>

     <div className="CartItemCard">
     
      {item?.productId?.images?.length &&  <img src={item?.productId?.images[0]?.image} alt="ssa" />}
     
    
     <div>
       <Link to={`/product/${item?.productId?._id}`}>{item?.productId?.name}</Link>
       <span>{`Price: ₹${item?.productId?.price}`}</span>
       <p onClick={() => deleteCartItems(item._id)}>Remove</p>
     </div>
   </div>
     </Fragment> 
    }
    </>

  );
};

export default CartItemCard;
