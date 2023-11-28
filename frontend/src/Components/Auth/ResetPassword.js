import React, { Fragment, useEffect, useState } from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Loader from "../Layouts/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {  clearError, resetPasswordReq } from "../Redux/Reducers/UserSlices/Auth.Slice";
import LockIcon from '@mui/icons-material/Lock';
import "./ResetPassword.css"
const ResetPassword = () => {
    const { error, loading, success,msg} = useSelector((state)=>state.AuthSlice)
    const Dispatch = useDispatch();
    const Navigate=useNavigate();
  const [password,setpassword]=useState("");
  const [confirmPassword,setconfirmPassword]=useState("");
  const params=useParams();
    const RegisterSubmit=async()=>{
        const payload={
            password,
            confirmPassword,
            resetToken:params.resetToken
        }
        Dispatch(resetPasswordReq({payload}))

    }
    useEffect(() => {
        if (error) {
            let suceesmsg=error;
           
            if(error=="Json Web Token is Expired, Try again "){
                suceesmsg="Token has been expired please request again for new token"
                console.log("error",suceesmsg) 
            }
            const ErrorToast = () => {
                toast.error(suceesmsg, {
                  position: toast.POSITION.TOP_LEFT,
                  autoClose: 3000, // Auto-close the toast after 5000 milliseconds (5 seconds)
                  hideProgressBar: false, // Show the progress bar
                  className: "custom-toast", // Custom class for styling
                });
              };
              ErrorToast();
          Dispatch(clearError());
        }
        if(success){
            const SucessMsg = () => {
               
                toast.success(msg, {
                  position: toast.POSITION.TOP_LEFT,
                  autoClose: 3000, // Auto-close the toast after 5000 milliseconds (5 seconds)
                  hideProgressBar: false, // Show the progress bar
                  className: "custom-toast", // Custom class for styling
                });
              };
              SucessMsg();
              Navigate('/login')
        }
      }, [error,success]);
    return (
        <Fragment>
      {
          loading ? (
            <Loader />
          ) : (
            <div className="ResetPasswordContainer">
                <div className="ResetPasswordBox">
                  <h2 className="ResetPasswordHeading">Reset Password</h2>
    
                  <form
                      className="ResetPasswordForm"
                onSubmit={RegisterSubmit}
              >
            <div >
              <LockIcon />
              <input
                type="password"
                required
                placeholder="New password.."
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div >
              <LockOpenIcon />
              <input
                type="password"
                required
                placeholder="Confirm password.."
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
            </div>
                <input type="submit" value="Update Password"   className="ResetPasswordBtn" />
              </form>
              </div>
        </div>
          )
        }
        <ToastContainer />
        </Fragment>
    
      
      )
}

export default ResetPassword
