import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../Layouts/Loader/Loader'
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./ForgotPassword.css";
import { ChangeOldPassword, ForgetPasswordReq, clearError } from "../Redux/Reducers/UserSlices/Auth.Slice";
const ForgetPassword = () => {
    const [email,setresetEmail]=useState("");
    const { error, loading, success,msg} = useSelector((state)=>state.AuthSlice)
    const Dispatch = useDispatch();
    const Navigate=useNavigate();

 
    const RegisterSubmit=async()=>{
     
        const token=localStorage.getItem("meToken");
        const payload={
            email
        }
        Dispatch(ForgetPasswordReq({token,payload}))

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
        }
      }, [error,success]);
  return (
    <Fragment>
    {
        loading ? (
          <Loader />
        ) : (
          <div className="ForgotPasswordContainer">
              <div className="ForgotPasswordBox">
                <h2 className="ForgotPasswordHeading">Reset Password</h2>
  
                <form
                    className="ForgotPasswordForm"
              onSubmit={RegisterSubmit}
            >
                <div className="LoginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                required
                placeholder="email.."
                value={email}
                onChange={(e) => setresetEmail(e.target.value)}
              />
            </div>
              <input type="submit" value="Update Password"   className="ForgotPasswordBtn" />
            </form>
            </div>
      </div>
        )
      }
      <ToastContainer />
      </Fragment>
  )
}

export default ForgetPassword
