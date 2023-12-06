import React, { Fragment, useEffect, useState } from "react";
import Loader from "../Layouts/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import Carousel from "react-material-ui-carousel";
import {
  AddReviews,
  clearError,
  clearReviewSuccess,
  getProuctDetails,
} from "../Redux/Reducers/ProductSlices/Product.slice";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard";
import Rating from "@mui/material/Rating";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { CreateCart } from "../Redux/Reducers/ProductSlices/Cart.slice";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const { id } = useParams();
  console.log("ProductID", id);
  const Dispatch = useDispatch();
  const { productDetails, loading, error,ReviewSuccess,msg } = useSelector(
    (store) => store.ProductSlice
  );
  const { success, Carterror } = useSelector((store) => store.CartSlice);
  const {LoginUser}=useSelector((store)=>store.AuthSlice);

  useEffect(() => {
    Dispatch(getProuctDetails({id}));
    if (error) {
      const ErrorToast = () => {
        toast.error(error, {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 5000, // Auto-close the toast after 5000 milliseconds (5 seconds)
          hideProgressBar: false, // Show the progress bar
          className: "custom-toast", // Custom class for styling
        });
        ErrorToast();
        Dispatch(clearError());
      };

    }
    if(ReviewSuccess==true){
      const sucess= ()=> toast.success(msg, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000, // Auto-close the toast after 5000 milliseconds (5 seconds)
        hideProgressBar: false, // Show the progress bar
        className: "custom-toast", // Custom class for styling
      });
      sucess()
Dispatch(clearReviewSuccess());

    }
  }, [ id, error,ReviewSuccess]);
  const submitReviewToggle = async () => {
    open ? setOpen(false) : setOpen(true);
  };
  const option = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth > 600 ? 20 : 25,
    value: productDetails?.ratings,
    isHalf: true,
  };

  const HandleQuanitity = (type) => {
    if (type == "incre") {
      if (productDetails?.Stock <= quantity) {
        return toast.error(
          `This Product has only ${productDetails?.Stock} stock`,
          {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 2000, // Auto-close the toast after 5000 milliseconds (5 seconds)
            hideProgressBar: false, // Show the progress bar
            className: "custom-toast", // Custom class for styling
          }
        );
      } else {
        setQuantity((prev) => prev + 1);
      }
    } else {
      if (1 >= quantity) {
        return;
      } else {
        setQuantity((prev) => prev - 1);
      }
    }
  };
  const reviewSubmitHandler = async (id) => {
    const token=localStorage.getItem("meToken");
    if(token){
      const payload={
        rating, comment, productId:id
      }
      Dispatch(AddReviews({payload,token}))
    }else{
     return toast.error("Please login first to add reviews", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2500, // Auto-close the toast after 5000 milliseconds (5 seconds)
        hideProgressBar: false, // Show the progress bar
        className: "custom-toast", // Custom class for styling
      });
    }

    setComment("");
    setRating("")
    setOpen(false);
  };
  useEffect(() => {
    if (true) {
      console.log("cartNotify", success, Carterror);
    }
    const Sucess = () => {
      toast.success("Product has been added  in cart", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2500, // Auto-close the toast after 5000 milliseconds (5 seconds)
        hideProgressBar: false, // Show the progress bar
        className: "custom-toast", // Custom class for styling
      });
      Sucess();
    };

    if (!Carterror) {
      const ErrorToast = () => {
        toast.error(Carterror, {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 3000, // Auto-close the toast after 5000 milliseconds (5 seconds)
          hideProgressBar: false, // Show the progress bar
          className: "custom-toast", // Custom class for styling
        });
        ErrorToast();
      };
    }
  }, [success, Carterror, Dispatch]);

  const addToCartHandler = async (id) => {
    const token = localStorage.getItem("meToken");
    const payload = {
      productId: id,
      quantity,
    };
    Dispatch(CreateCart({ token, payload }));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="ProdcutDetails">
            <div>
              <Carousel>
                {productDetails?.images?.length &&
                  productDetails?.images?.map((item, i) => (
                    <img
                      key={item._id}
                      src={
                        "https://media.istockphoto.com/id/1141698953/photo/spa-products-for-home-skin-care.jpg?s=2048x2048&w=is&k=20&c=LPud8PtyQb_4kEvSiVJJDLzh-LTWTaAb1KHeXDU-WuA="
                      }
                      alt={`${i}slide`}
                      className="CarouselImage"
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="productDetails-Block-1">
                <h2>{productDetails?.name}</h2>
                <p>productId # {productDetails?._id}</p>
              </div>
              <div className="productDetails-Block-2">
                <ReactStars {...option} />
                <span className="productCardSpan">{`${productDetails?.numOfReviews} reviews`}</span>
              </div>
              <div className="productDetails-Block-3">
                <h1>{`₹${productDetails?.price}`}</h1>
                <div className="productDetails-Block-3-1">
                  <div className="productDetails-Block-3-1-1">
                    <button onClick={() => HandleQuanitity("incre")}>+</button>
                    <input type="Number" value={quantity} />
                    <button onClick={() => HandleQuanitity("decre")}>-</button>
                  </div>
                  <button
                    disabled={productDetails?.Stock < 1 ? true : false}
                    onClick={() => addToCartHandler(productDetails?._id)}
                  >
                    Add To Cart
                  </button>
                </div>
                <p>
                  Status:
                  <b
                    className={
                      productDetails?.Stock < 1 ? "redColor" : "greenColor"
                    }
                  >
                    {productDetails?.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="productDetails-Block-4">
                Description: <p>{productDetails?.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
              {productDetails?.reviews &&  productDetails.reviews.some((item) => item.userId._id === LoginUser?._id)? "Update review" : "Submit Review"}
              </button>
            </div>
          </div>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>   {productDetails?.reviews &&  productDetails.reviews.some((item) => item.userId._id === LoginUser?._id)? "Update review" : "Submit Review"}</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={()=>reviewSubmitHandler(productDetails?._id)} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          <h3 className="reviewsHeading"> Reviews </h3>

          {productDetails?.reviews?.length ? (
            <div className="reviews">
              {productDetails?.reviews.map((item) => (
                <ReviewCard key={item._id} review={item} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
      <ToastContainer />
    </Fragment>
  );
};

export default ProductDetails;
