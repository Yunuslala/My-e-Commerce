import React, { Fragment, useEffect } from 'react'
import DummyProfileIcon from "../../images/Profile.png"
import { useSelector } from 'react-redux'
import Loader from '../Layouts/Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import "./Profile.css"
const UserProfile = () => {
  const {LoginUser,loading,loginSucess}=useSelector((store)=>store.AuthSlice);
  const Navigate=useNavigate()
  useEffect(()=>{
    if(!loginSucess){
      Navigate('/login')
    }
  },[loginSucess])
  return (
    <Fragment>
     {
      loading ? (
        <Loader />
      ) : (
        <div className='ProfileDiv'>
        <div>
        <h1>My Profile</h1>
          <img src={LoginUser?.avatar ? LoginUser?.avatar : DummyProfileIcon} />
          <Link to="/edit/profile">Edit Profile</Link>
        </div>
        <div>
        <div>
        <h4>My Name</h4>
          <p>{LoginUser?.name}</p>
        </div>
        <div>
        <h4>My Email</h4>
          <p>{LoginUser?.email}</p>
        </div>
        <div>
        <h4>Join On</h4>
          <p>{String(LoginUser?.createdAt).substring(0,10)}</p>
        </div>
        <div>
        <Link to="/orders">My orders</Link>
        <Link to="/Change/Password">Change password</Link>
        </div>
         
        </div>
      </div>
      )
     }
    </Fragment>
  )
}

export default UserProfile
