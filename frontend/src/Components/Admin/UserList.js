import React, { Fragment, useEffect } from 'react'
import "./OrderList.css"
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layouts/Loader/Loader";
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from './SideBar';
import { ToastContainer, toast } from 'react-toastify';
import { AllExistUser, DeleteUser, clearMessage, clearSucess} from '../Redux/Reducers/UserSlices/Auth.Slice';
const UserList = () => {
    const {Alluser,error,success,msg}=useSelector((state)=>state.AuthSlice);
   const token=localStorage.getItem("meToken");
   const navigate=useNavigate();
    const Dispatch=useDispatch()
    useEffect(()=>{
        Dispatch(AllExistUser({token}));
        // Dispatch(clearMessage());
            
    },[])
    const deleteUserHandler=async(id)=>{
        Dispatch(DeleteUser({token,id}));
        if(success){
            const suces=()=>toast.success("User has been deleted",{
                position: toast.POSITION.TOP_LEFT,
                autoClose: 2000, // Auto-close the toast after 5000 milliseconds (5 seconds)
                hideProgressBar: false, // Show the progress bar
                className: 'custom-toast', // 
            })
            suces();
            navigate('/admin/Users')
            // Dispatch(clearMessage());
            
        }

    }
    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
    
        {
          field: "email",
          headerName: "Email",
          minWidth: 200,
          flex: 1,
        },
        {
          field: "name",
          headerName: "Name",
          minWidth: 150,
          flex: 0.5,
        },
    
        {
          field: "role",
          headerName: "Role",
          type: "number",
          minWidth: 150,
          flex: 0.3,
          cellClassName: (params) => {
            return params.id.role === "admin"
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
                <Link to={`/admin/Users/${params.row.id}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteUserHandler(params.row.id)
                  }
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];
    
      const rows = [];
    
      Alluser &&
        Alluser.forEach((item) => {
          rows.push({
            id: item._id,
            role: item.role,
            email: item.email,
            name: item.name,
          });
        });
      
      return (
        <Fragment>
        
    
          <div className="dashBoard">
            <SideBar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL USERS</h1>
    
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            </div>
          </div>
        </Fragment>
      );
}

export default UserList
