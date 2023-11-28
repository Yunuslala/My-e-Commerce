// userSlice.js
import { createSlice,createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
const url="http://localhost:4500";


export const getAllUser=createAsyncThunk("/get/User",async()=>{
  try {
    const {data}=await axios.get(`${url}/api/v1/User/Alluser`);
    return data
  } catch (error) {
    throw error.response.data.msg
  }

})

export const LoginAction=createAsyncThunk("/login/User",async(payload)=>{
  try {
    const {data}=await axios.post(`${url}/api/v1/User/login`,payload);
    return data
  } catch (error) {
    throw error.response.data.msg
    
  }
})

export const SignupAction=createAsyncThunk("/signup/User",async(payload)=>{
  try {
    const {data}=await axios.post(`${url}/api/v1/User/register`,payload);
    return data
  } catch (error) {
    throw error.response.data.msg
    
  }
})

export const GetProfile=createAsyncThunk("/User/profile",async(token)=>{
  try {
    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `${token}`,
    };
    console.log("token",token);
    const {data}=await axios.get(`${url}/api/v1/User/profile`,{headers});
    return data
  } catch (error) {
    throw error.response.data.msg
    
  }
})

export  const ChangeOldPassword=createAsyncThunk('/password/update',async({token,payload})=>{
  try {
    console.log("ChangePassowrdAction",payload,token)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    };
    console.log("token",token);
    const {data}=await axios.patch(`${url}/api/v1/User/update-password`,payload,{headers});
    return data
  } catch (error) {
    throw error.response.data.msg
    
  }
})

export const UpadteMe=createAsyncThunk("/User/Update",async({token,payload})=>{
  try {
    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `${token}`,
    };
    console.log("token",token);
    const {data}=await axios.patch(`${url}/api/v1/User/update-profile`,payload,{headers});
    return data
  } catch (error) {
    throw error.response.data.msg
    
  }
})

export const ForgetPasswordReq=createAsyncThunk("/User/Forget/pass",async({payload})=>{
  try {
    const headers = {
      'Content-Type': 'application/json',

    };
  
    const {data}=await axios.patch(`${url}/api/v1/User/forget/password`,payload,{headers});
    return data
  } catch (error) {
    throw error.response.data.msg
    
  }
})
export const resetPasswordReq=createAsyncThunk("/User/reset/pass",async({payload})=>{
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    const {data}=await axios.patch(`${url}/api/v1/User/reset/password`,payload,{headers});
    return data
  } catch (error) {
    throw error.response.data.msg
    
  }
})
export const clearError=createAction("clearError");
export const Logout=createAction("Logout")

const initialState={
  Alluser:[],
  loading:false,
  error:null,
  registerSuccess:false,
  token:"",
  loginSucess:false,
  LoginUser:{},
  isUpdated:false,
  isPasswordUpdated:false,
  success:false,
  msg:""
}

const UserSlice=createSlice({
  name:"userData",
  initialState,
  reducers:{
    clearError:(state)=>state.error=null,
    Logout:(state)=>state.loginSucess=false
  },
  extraReducers:(builder)=>{
    builder.addCase(getAllUser.pending,(state)=>{
      state.loading=true
    })
    .addCase(getAllUser.fulfilled,(state,action)=>{
      console.log("objectoferror",action.payload.data);
      state.loading=false;
      state.Alluser=action.payload.data
      state.error=null
    })
    .addCase(getAllUser.rejected,(state,action)=>{
   
      state.error=action.error.message
      state.loading=false;
    })
    builder.addCase(LoginAction.pending,(state)=>{
      state.loading=true
    })
    .addCase(LoginAction.fulfilled,(state,action)=>{
      state.loading=false;
      state.LoginUser=action.payload.data;
      state.loginSucess=true;
      state.token=action.payload.token
      state.error=null
    })
    .addCase(LoginAction.rejected,(state,action)=>{
      state.error=action.error.message
      state.loading=false;
      state.token=""
    })
    builder.addCase(SignupAction.pending,(state)=>{
      state.loading=true
    })
    .addCase(SignupAction.fulfilled,(state,action)=>{
      state.loading=false;
      state.registerSuccess=true;state.error=null
    })
    .addCase(SignupAction.rejected,(state,action)=>{
      state.error=action.error.message
      state.loading=false;
    })
    builder.addCase(GetProfile.pending,(state,action)=>{
      state.loading=true;
    })
    .addCase(GetProfile.fulfilled,(state,action)=>{
      state.loading=false;
      state.LoginUser=action.payload.data;
      state.loginSucess=true;
      state.error=null
    })
    .addCase(GetProfile.rejected,(state,action)=>{
      state.error=action.error.message;
      state.loading=false;
    })
    builder.addCase(UpadteMe.pending,(state,action)=>{
      state.loading=true;
    })
    .addCase(UpadteMe.fulfilled,(state,action)=>{
      state.loading=false;
      state.LoginUser=action.payload.data;
      state.loginSucess=true;
      state.isUpdated=true
      state.error=null
    })
    .addCase(UpadteMe.rejected,(state,action)=>{
      state.error=action.error.message;
      state.loading=false;
    })
    builder.addCase(ChangeOldPassword.pending,(state,action)=>{
      state.loading=true;
    })
    .addCase(ChangeOldPassword.fulfilled,(state,action)=>{
      state.loading=false;
      state.LoginUser=action.payload.data;
      state.isPasswordUpdated=true
      state.error=null
    })
    .addCase(ChangeOldPassword.rejected,(state,action)=>{
      state.error=action.error.message;
      state.loading=false;
    })
    builder.addCase(ForgetPasswordReq.pending,(state,action)=>{
      state.loading=true;
      state.success=false;
      state.msg=""
    })
    .addCase(ForgetPasswordReq.fulfilled,(state,action)=>{
      console.log("ofPayloadForget",action.payload)
      state.loading=false;
      state.success=true;
      state.msg=action.payload.message;
      state.error=null
    })
    .addCase(ForgetPasswordReq.rejected,(state,action)=>{
      state.error=action.error.message;
      state.loading=false;
    })
    builder.addCase(resetPasswordReq.pending,(state,action)=>{
      state.loading=true;
      state.success=false;
      state.msg=""
    })
    .addCase(resetPasswordReq.fulfilled,(state,action)=>{
      state.loading=false;
      state.success=true
      state.msg=action.payload.message;
      state.error=null
    })
    .addCase(resetPasswordReq.rejected,(state,action)=>{
      state.error=action.error.message;
      state.loading=false;
    })
    
  }
})



export default UserSlice.reducer