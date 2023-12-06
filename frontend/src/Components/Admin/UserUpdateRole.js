import React, { Fragment, useEffect, useState } from 'react'
import SideBar from './SideBar'
import Loader from '../Layouts/Loader/Loader'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetSingleUser } from '../Redux/Reducers/UserSlices/Auth.Slice';
import { Button } from '@mui/material';
import "./UserUpdate.css";
const UserUpdateRole = () => {
    const [role,setRole]=useState("");
    const  token=localStorage.getItem("meToken");
    const Dispatch=useDispatch();
    const params=useParams();
    const {SingleUser,success,loading,UserRoleUpdate}=useSelector((state)=>state.AuthSlice);

    const updateUserSubmitHandler=(e)=>{
        e.preventDefault()
    }
    useEffect(()=>{
        if(token){
            Dispatch(GetSingleUser({token,id:params.id}))
        }
    },[])
    return (
    <Fragment>
    <div className="dashBoard">
      <SideBar />
      <div className="UserUpdateContainer">
        {loading ? (
          <Loader />
        ) : (
          <form
            className="UserUpdateForm"
            onSubmit={updateUserSubmitHandler}
          >
            <h1>Update User Role</h1>

            <div>
              <PersonIcon />
              <input
                type="text"
                placeholder="Name"
                required
                disabled
                value={SingleUser?.name}
              
              />
            </div>
            <div>
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={SingleUser?.email}
                disabled
               
              />
            </div>

            <div>
              <VerifiedUserIcon />
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                UserRoleUpdate ? true : false || role === "" ? true : false
              }
            >
              Update
            </Button>
          </form>
        )}
      </div>
    </div>
  </Fragment>
    )
}

export default UserUpdateRole
