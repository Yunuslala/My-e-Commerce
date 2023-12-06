import React, { Fragment, useEffect, useState } from 'react'
import SideBar from './SideBar'
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteReviews, getProuctDetails} from '../Redux/Reducers/ProductSlices/Product.slice';
import "./ProductReview.css"
import { ToastContainer, toast } from 'react-toastify';


const ProductReview = () => {
  const [productId, setProductId] = useState("");
  const {loading,DeleteReviewsSucess,productDetails}=useSelector((state)=>state.ProductSlice);
  const token=localStorage.getItem("meToken");
  const columns=[
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.row.rating >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params.row.id)
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows=[];

  productDetails?.reviews &&
  productDetails?.reviews.forEach((item) => {
    rows.push({
      id: item._id,
      rating: item.rating,
      comment: item.comment,
      user: item?.userId?.name,
    });
  });

  const dispatch=useDispatch();
  useEffect(()=>{
    if(productId.length==24){
      dispatch(getProuctDetails({id:productId}))
    }
    if(DeleteReviewsSucess==true){
     const suc=()=> toast.success('review has been deleted',{
      position: toast.POSITION.TOP_LEFT,
      autoClose: 2000, // Auto-close the toast after 5000 milliseconds (5 seconds)
      hideProgressBar: false, // Show the progress bar
      className: 'custom-toast', // 
      })
      suc();
    }
  },[productId,DeleteReviewsSucess])





  const deleteReviewHandler = (reviewId) => {
    dispatch(DeleteReviews({id:reviewId,token, productId:productId}));
  };
    const productReviewsSubmitHandler=async(e)=>{
      e.preventDefault();
      dispatch(getProuctDetails({id:productId}))
    }
  return (
   <Fragment>
    <div className='dashBoard'>
    <SideBar />
    <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <StarIcon />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {productDetails?.reviews && productDetails?.reviews?.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
    </div>
    <ToastContainer />
   </Fragment>
  )
}

export default ProductReview
