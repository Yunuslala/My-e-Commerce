import React, { Fragment, useEffect, useRef, useState } from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Loader from "../Layouts/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ChangeOldPassword, clearError } from "../Redux/Reducers/UserSlices/Auth.Slice";
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import "./ChangePassword.css"
const ChangePassword = () => {
    const { error, loading, isPasswordUpdated} = useSelector((state)=>state.AuthSlice)
    const Dispatch = useDispatch();
    const Navigate=useNavigate();
  const Usertoken=localStorage.getItem("meToken")
  const [oldPassword,setoldPassword]=useState("");
  const [newPassword,setnewPassword]=useState("");
  const [ConfirmPassword,setConfirmPassword]=useState("");

    const RegisterSubmit=async()=>{
        const payload={
            oldpassword:oldPassword,
            newpassword:newPassword,
            confirmPassword:ConfirmPassword
        }
        const token=localStorage.getItem("meToken")
        Dispatch(ChangeOldPassword({token,payload}))

    }
    useEffect(() => {
        if (error) {
            const ErrorToast = () => {
                toast.error(error, {
                  position: toast.POSITION.TOP_LEFT,
                  autoClose: 3000, // Auto-close the toast after 5000 milliseconds (5 seconds)
                  hideProgressBar: false, // Show the progress bar
                  className: "custom-toast", // Custom class for styling
                });
              };
              ErrorToast();
          Dispatch(clearError());
        }
        if(isPasswordUpdated){
            const SucessMsg = () => {
                toast.success("Password has been Updated", {
                  position: toast.POSITION.TOP_LEFT,
                  autoClose: 3000, // Auto-close the toast after 5000 milliseconds (5 seconds)
                  hideProgressBar: false, // Show the progress bar
                  className: "custom-toast", // Custom class for styling
                });
              };
              SucessMsg();
            Navigate("/account")
        }
      }, [error,isPasswordUpdated]);
    return (
        <Fragment>
      {
          loading ? (
            <Loader />
          ) : (
            <div className="ChangePasswordContainer">
                <div className="ChangePasswordBox">
                  <h2 className="ChangePasswordHeading">Update Profile</h2>
    
                  <form
                      className="ChangePasswordForm"
                onSubmit={RegisterSubmit}
              >
                 <div className="LoginPassword">
              <VpnKeyIcon />
              <input
                type="password"
                required
                placeholder="Old password.."
                value={oldPassword}
                onChange={(e) => setoldPassword(e.target.value)}
              />
            </div>
            <div className="LoginPassword">
              <LockIcon />
              <input
                type="password"
                required
                placeholder="New password.."
                value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}
              />
            </div>
            <div className="LoginPassword">
              <LockOpenIcon />
              <input
                type="password"
                required
                placeholder="Confirm password.."
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
                <input type="submit" value="Update Password"   className="ChangePasswordBtn" />
              </form>
              </div>
        </div>
          )
        }
        <ToastContainer />
        </Fragment>
    
      
      )
}

export default ChangePassword
