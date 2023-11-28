import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layouts/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Slider from "@mui/material/Slider";
import { useEffect } from "react";
import {
  clearError,
  getAllProducts,
} from "../Redux/Reducers/ProductSlices/Product.slice";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";
import "./Product.css";
import { Typography } from "@mui/material";
import { getAllCategory } from "../Redux/Reducers/ProductSlices/Category.slice";
const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 50000]);
  const [ratings, setRatings] = useState();
  const [flag, setFlag] = useState(false);
  const [Category, setCategory] = useState("");
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
    setTimeout(() => {
      setFlag((prev) => !prev);
    }, 300);
  };
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("search");
  console.log("ParamValue", paramValue);
  const { products, error, loading, productCount, resultPerPage } = useSelector(
    (store) => store.ProductSlice
  );
  const CategoryData = useSelector((store) => store.CategorySlice);
  useEffect(() => {
    let page = currentPage;
    console.log("currePageNo", price);
    dispatch(
      getAllProducts({
        search: paramValue,
        page,
        minPrice: price[0],
        maxPrice: price[1],
        ratings: ratings,
        filter:Category
      })
    );
    setRatings("");
    setCategory("")
    if (error) {
      const ErrorToast = () => {
        toast.error(error, {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 5000, // Auto-close the toast after 5000 milliseconds (5 seconds)
          hideProgressBar: false, // Show the progress bar
          className: "custom-toast", // Custom class for styling
        });
      };
      ErrorToast();

      dispatch(clearError());
    }
  }, [dispatch, error, flag, currentPage]);

  useEffect(() => {
    dispatch(getAllCategory());
    if (error) {
      const ErrorToast = () => {
        toast.error(error, {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 5000, // Auto-close the toast after 5000 milliseconds (5 seconds)
          hideProgressBar: false, // Show the progress bar
          className: "custom-toast", // Custom class for styling
        });
      };
      ErrorToast();
      dispatch(clearError());
    }
  }, [dispatch, CategoryData.error]);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products.length &&
              products.map((item) => <ProductCard product={item} />)}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              size="small"
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={50000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {CategoryData.Categories &&
                CategoryData.Categories.map((category) => (
                  <li
                    className="category-link"
                    key={category._id}
                    onClick={() => {
                      setCategory(category._id);
                      setTimeout(() => {
                        setFlag((prev) => !prev);
                      }, 300);
                    }}
                  >
                    {category.name}
                  </li>
                ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                  setTimeout(() => {
                    setFlag((prev) => !prev);
                  }, 300);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                size="small"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < productCount && (
            <div className="PaginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
      <ToastContainer />
    </Fragment>
  );
};

export default Product;
