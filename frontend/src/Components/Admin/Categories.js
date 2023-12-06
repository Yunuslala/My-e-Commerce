import React, { Fragment, useEffect, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import SideBar from "./SideBar";
import "./Categories.css";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DeleteIcon from "@mui/icons-material/Delete";

import { Button, DialogActions } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CreateCategory, DeleteCategory, getAllCategory } from "../Redux/Reducers/ProductSlices/Category.slice";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
const Categories = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const Dispatch = useDispatch();
  const token = localStorage.getItem("meToken");
  const navigate=useNavigate();
  const { Categories, loading } = useSelector((state) => state.CategorySlice);
  const toggleDialog = () => {
    console.log("open");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload={
        name:name
    }
    Dispatch(CreateCategory({token,payload}))
    window.location.reload()
  };

  useEffect(() => {
    Dispatch(getAllCategory());
  }, []);
  const deleteOrderHandler = async (id) => {
    Dispatch(DeleteCategory({token,id}))
    window.location.reload()
  };
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Category Name",
      minWidth: 150,
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
        <Button onClick={() => deleteOrderHandler(params.row.id)}>
          <DeleteIcon />
        </Button>
        )
      },
    },
  ];
  const rows = [];
  Categories &&
    Categories.forEach((item, index) => {
      rows.push({
        id: item._id,
        status: item.name,
      });
    });

  return (
    <Fragment>
      <div className="dashBoard">
        <SideBar />
        <div className="newCategoryContainer">
          <button onClick={toggleDialog} className="AddBtn">
            Add new
          </button>
          <h1 id="categoryHeading">Categories</h1>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          <Dialog open={open} onClose={handleClose} className="DialogClass">
            <form onSubmit={handleSubmit} className="createCategoryForm">
              <h1>Create Category</h1>
              <div>
                <AccountTreeIcon />
                <input
                  type="text"
                  placeholder="Categories"
                  name="category"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <Button
                id="createCategoryBtn"
                type="submit"
                onClick={handleClose}
              >
                Create
              </Button>
            </form>
          </Dialog>
        </div>
      </div>
    </Fragment>
  );
};

export default Categories;
