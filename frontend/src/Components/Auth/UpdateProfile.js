import React, { Fragment, useEffect,  useState } from "react";
import "./UpdateProfile.css";
import {  useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ProfImage from "../../images/Profile.png";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import {
  UpadteMe,
  clearError
} from "../Redux/Reducers/UserSlices/Auth.Slice";
import Loader from "../Layouts/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
const UpdateProfile = () => {
  const { error, loading, loginSucess,isUpdated,LoginUser} = useSelector((state)=>state.AuthSlice)
  const [registerEmail, setregisterEmail] = useState(LoginUser?.email);
  const [name, setregistername] = useState(LoginUser?.name);
  const [image, setImage] = useState(null);
 
  const Dispatch = useDispatch();
  const Navigate=useNavigate();
  const [flag,setFlag]=useState(false)
    const Usertoken=localStorage.getItem("meToken")
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
    if(!loginSucess){
        Navigate("/login")
    }
    if (isUpdated==true) {
      const ErrorToast = () => {
          toast.success("Profile has been Updated", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 3000, // Auto-close the toast after 5000 milliseconds (5 seconds)
            hideProgressBar: false, // Show the progress bar
            className: "custom-toast", // Custom class for styling
          });
        };
        ErrorToast();
        Navigate("/account")
    Dispatch(clearError());
  }
  }, [error,loginSucess,isUpdated,flag]);

  const RegisterSubmit = async (e) => {
    e.preventDefault();
    const registerData = new FormData();
    registerData.append("name", name);
    registerData.append("email", registerEmail);
    registerData.append("profile", image);
    
    console.log("imageval",image)

    Dispatch(UpadteMe({payload:registerData,token:Usertoken}));
    setFlag((prev)=>!prev)
  };
  return (
    <Fragment>
  {
      loading ? (
        <Loader />
      ) : (
        <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                  className="updateProfileForm"
            onSubmit={RegisterSubmit}
          >
            <div className="updateProfileName">
              <FaceIcon />
              <input
                type="text"
                placeholder="name.."
                value={name}
                onChange={(e) => setregistername(e.target.value)}
              />
            </div>
            <div className="updateProfileEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="email.."
                value={registerEmail}
                onChange={(e) => setregisterEmail(e.target.value)}
              />
            </div>
            <div id="updateProfileImage">
              <img src={LoginUser? LoginUser.avatar: ProfImage} alt="Profile" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <input type="submit" value="Update"   className="updateProfileBtn" />
          </form>
          </div>
    </div>
      )
    }
    <ToastContainer />
    <div>Editme</div>
    </Fragment>

  
  )
}

export default UpdateProfile
