import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrder } from "../Redux/Reducers/ProductSlices/OrderSlice";
import Loader from "../Layouts/Loader/Loader";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import "./Order.css"

const Order = () => {
  const { UserOrders, loading, error, sucess, msg } = useSelector(
    (state) => state.OrderSlice
  );
  const { loginSucess, LoginUser } = useSelector((state) => state.AuthSlice);
  const token = localStorage.getItem("meToken");
  const Dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      Dispatch(getUserOrder({ token }));
    }
  }, []);
  const rows = [];
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        console.log("paramsId",params.row.status)
        return params.row.status === "Processing" ?  "redColor":"greenColor" ;
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
        return (
          <Link to={`/orders/me/${params.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  UserOrders &&
    UserOrders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.CartId.items.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
          <Typography id="myOrdersHeading">
            {LoginUser?.name}'s Orders
          </Typography>
        </div>
      )}
    </Fragment>
  );
};

export default Order;
