import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Redux/Reducers/ProductSlices/Product.slice";
import Loader from "../Layouts/Loader/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductCard from "./ProductCard";

const Home = () => {
  const dispatch = useDispatch();
  const { products, error, loading, productCount } = useSelector(
    (store) => store.ProductSlice
  );

    
  
  useEffect(() => {
    dispatch(getAllProducts({search:"",page:""}));
    if(error){
      const ErrorToast=()=>{
        toast.error(error, {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 5000, // Auto-close the toast after 5000 milliseconds (5 seconds)
          hideProgressBar: false, // Show the progress bar
          className: 'custom-toast', // Custom class for styling
        });
      }
      ErrorToast()
    }
  }, [dispatch,error]);
  return (
    <Fragment>
   
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
       
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((item) => <ProductCard key={item._id} product={item} />)}
          </div>
     
        </Fragment>
        
      )}
      <ToastContainer />
    </Fragment>
  );
};

export default Home;
