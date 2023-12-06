import React, { Fragment, useEffect, useRef, useState } from "react";
import "./LoginSignup.css";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ProfImage from "../../images/Profile.png";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import {
  LoginAction,
  SignupAction,
  clearError,
} from "../Redux/Reducers/UserSlices/Auth.Slice";
import Loader from "../Layouts/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
const LoginSignup = () => {
    const { error, loading, loginSucess,token} = useSelector((state)=>state.AuthSlice)
  const logintab = useRef(null);
  const RegisterTab = useRef(null);
  const SwitchTab = useRef(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setregisterEmail] = useState("");
  const [registerPassword, setregisterPassword] = useState("");
  const [name, setregistername] = useState("");
  const [image, setImage] = useState(null);
  const Dispatch = useDispatch();
  const Navigate=useNavigate();
  // const Usertoken=localStorage.getItem("meToken")
  useEffect(() =>
   {
    if (error) {
      console.log("loginerror",error)
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
    if(loginSucess){
        Navigate("/account")
    }
    if(token){
        localStorage.setItem("meToken",token)
    }
  }, [error,Dispatch,Navigate,token,loginSucess]);
  
  const LoginSubmit = async (e) => {
    e.preventDefault();
    const Payload = {
      email: loginEmail,
      password: loginPassword,
    };
  Dispatch(LoginAction(Payload));
  };
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      SwitchTab.current.classList.add("shiftToNeutral");
      SwitchTab.current.classList.remove("shiftToRight");

      RegisterTab.current.classList.remove("shiftToNeutralForm");
      logintab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      SwitchTab.current.classList.add("shiftToRight");
      SwitchTab.current.classList.remove("shiftToNeutral");

      RegisterTab.current.classList.add("shiftToNeutralForm");
      logintab.current.classList.add("shiftToLeft");
    }
  };
  const RegisterSubmit = async (e) => {
    e.preventDefault();
    const registerData = new FormData();
    registerData.append("name", name);
    registerData.append("email", registerEmail);
    registerData.append("password", registerPassword);
    registerData.append("profile", image);
    Dispatch(SignupAction(registerData));
  };
  return (
    <Fragment>
     {
        loading ? (<Loader />) : (
            <div className="LoginSignupContainer">
        <div className="LoginSignupDiv">
          <div>
            <div className="LoginSignupToggle">
              <p onClick={(e) => switchTabs(e, "login")}>Login</p>
              <p onClick={(e) => switchTabs(e, "register")}>Registration</p>
            </div>
            <button ref={SwitchTab}></button>
          </div>
          <form className="LoginForm" ref={logintab} onSubmit={LoginSubmit}>
            <div className="LoginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                required
                placeholder="email.."
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="LoginPassword">
              <LockOpenIcon />
              <input
                type="password"
                required
                placeholder="password.."
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/forget/Password">forgot Password?</Link>
            <input type="submit" value="submit" className="LoginSubmit" />
          </form>
          <form
            className="signupForm"
            ref={RegisterTab}
            onSubmit={RegisterSubmit}
          >
            <div className="SignUpName">
              <FaceIcon />
              <input
                type="text"
                required
                placeholder="name.."
                value={name}
                onChange={(e) => setregistername(e.target.value)}
              />
            </div>
            <div className="SignUpEmail">
              <MailOutlineIcon />
              <input
                type="email"
                required
                placeholder="email.."
                value={registerEmail}
                onChange={(e) => setregisterEmail(e.target.value)}
              />
            </div>
            <div className="SignUpPassword">
              <LockOpenIcon />
              <input
                type="password"
                required
                placeholder="password.."
                value={registerPassword}
                onChange={(e) => setregisterPassword(e.target.value)}
              />
            </div>
            <div className="registerImage">
              <img src={ProfImage} alt="Profile" />
              <input
                type="file"
                name="avatar"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <input type="submit" value="submit" className="signUpBtn" />
          </form>
        </div>
      </div>
        )
     }
     <ToastContainer />
    </Fragment>
  );
};

export default LoginSignup;
