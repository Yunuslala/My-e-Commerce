import React, { Fragment, useEffect } from 'react'
import "./OrderList.css"
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { ClearMessage, DeleteUserOrder, RemoveDeleteOrder, clearError, clearSucess, getAllOrders, getUserOrder } from "../Redux/Reducers/ProductSlices/OrderSlice";
import Loader from "../Layouts/Loader/Loader";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from './SideBar';
import { ToastContainer, toast } from 'react-toastify';
const OrderList = () => {
    const { AllOrders, loading,deleteOrder, error, sucess, msg } = useSelector(
        (state) => state.OrderSlice
      );
      const { loginSucess, LoginUser } = useSelector((state) => state.AuthSlice);
      const token = localStorage.getItem("meToken");
      const Dispatch = useDispatch();
      useEffect(() => {
        if (token) {
          Dispatch(getAllOrders({ token }));
          Dispatch(ClearMessage());
          Dispatch(clearSucess());
        }
      }, []);
      useEffect(()=>{
        if(deleteOrder){
          const sucess=()=> toast.success(msg,{
            position: toast.POSITION.TOP_LEFT,
            autoClose: 2000, // Auto-close the toast after 5000 milliseconds (5 seconds)
            hideProgressBar: false, // Show the progress bar
            className: 'custom-toast', // 
          })
          sucess()
          Dispatch(RemoveDeleteOrder())
          
        }
       if(error){
        const error=()=> toast.error(error,{
          position: toast.POSITION.TOP_LEFT,
          autoClose: 2000, // Auto-close the toast after 5000 milliseconds (5 seconds)
          hideProgressBar: false, // Show the progress bar
          className: 'custom-toast', // 
        })
        error()
        Dispatch(clearError());
        window.location.reload();
       }
      },[error,deleteOrder])
      const deleteOrderHandler=(id)=>{
        Dispatch(DeleteUserOrder({id,token}))
        console.log(id)
      }
      const rows = [];
      const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 150,
          flex: 0.5,
          cellClassName: (params) => {
            return params.row.status === "Delivered" ? "greenColor" : "redColor" ;
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "amount",
          headerName: "Amount",
          type: "number",
          minWidth: 270,
          flex: 0.5,
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return(
            <Fragment>
            <Link to={`/admin/order/${params.row.id}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.row.id)
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
            )
          },
        },
      ];
    
      AllOrders &&
        AllOrders.forEach((item, index) => {
          rows.push({
            itemsQty: item.orderItems.CartId.items.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice,
          });
        });
  return (
    <div className='dashBoard'>
    <SideBar />
 <Fragment >
    {loading ? (
      <Loader />
    ) : (
      <div className="productListContainer">
      <h1 id="productListHeading">All Orders</h1>
        <DataGrid
         rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
        />
      </div>
    )}
    <ToastContainer />
  </Fragment>
    </div>
   
  )
}

export default OrderList
