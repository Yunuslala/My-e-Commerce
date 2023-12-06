import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const url="https://e-coomercebackend.onrender.com"


export const CreateCart=createAsyncThunk('/user/create/cart',async({token,payload})=>{
    try {
    const headers = {
        'Content-Type': 'application/json',
      'Authorization': `${token}`,
      };
      const {data}=await axios.post(`${url}/api/v1/User/Cart`,payload,{headers});
      return data
    } catch (error) {
      throw error.response.data.msg
    }
})

export const UpdateCartQuantity=createAsyncThunk('/user/final/Update/cart',async({token,payload})=>{
    try {
        const headers = {
            'Content-Type': 'application/json',
          'Authorization': `${token}`,
          };
          const {data}=await axios.put(`${url}/api/v1/User/Cart`,payload,{headers});
          return data
        } catch (error) {
          throw error.response.data.msg
        }
})

export const removeFromCart=createAsyncThunk('/user/remove/cart',async({token,payload})=>{
    try {
        const headers = {
            'Content-Type': 'application/json',
          'Authorization': `${token}`,
          };
          const {data}=await axios.patch(`${url}/api/v1/User/Cart`,payload,{headers});
          return data
        } catch (error) {
            
          throw error.response.data.msg
        }
})

export const getUserCartData=createAsyncThunk('/user/getAll/cart',async({token})=>{
    try {
        const headers = {
            'Content-Type': 'application/json',
          'Authorization': `${token}`,
          };
          const {data}=await axios.get(`${url}/api/v1/User/Cart`,{headers});
          return data
        } catch (error) {
          throw error.response.data.msg
        }
})

const initialState={
    loading:false,
    Carterror:null,
    success:false,
    cartData:[],
    message:""
}
const CartSlice=createSlice({
    name:"CartData",
    initialState,
    reducers:{
      clearError:(state)=>state.error=null,
    },
    extraReducers:(builder)=>{
      builder.addCase(CreateCart.pending,(state)=>{
        state.loading=true
        state.message=""
      })
      .addCase(CreateCart.fulfilled,(state,action)=>{
        state.loading=false;
        state.success=true;
        state.Carterror=null  
      })
      .addCase(CreateCart.rejected,(state,action)=>{
        state.Carterror=action.error.message
        state.loading=false;
      })
      builder.addCase(UpdateCartQuantity.pending,(state)=>{
        state.loading=true
        state.message=""
      })
      .addCase(UpdateCartQuantity.fulfilled,(state,action)=>{
        state.loading=false;
        state.cartData=action.payload.data;
        state.success=true;
        state.message=action.payload.message
      })
      .addCase(UpdateCartQuantity.rejected,(state,action)=>{
        state.Carterror=action.error.message
        state.loading=false;
      })
      builder.addCase(removeFromCart.pending,(state)=>{
        state.loading=true
        state.message=""
      })
      .addCase(removeFromCart.fulfilled,(state,action)=>{
        state.loading=false;
        state.success=true;
        state.cartData=action.payload.data;
        state.Carterror=null
        state.message=action.payload.message
      })
      .addCase(removeFromCart.rejected,(state,action)=>{
        state.Carterror=action.error.message
        state.loading=false;
      })
      builder.addCase(getUserCartData.pending,(state,action)=>{
        state.loading=true;
        state.message=""
      })
      .addCase(getUserCartData.fulfilled,(state,action)=>{
        state.loading=false;
        state.cartData=action.payload.data;
        state.Carterror=null
    
      })
      .addCase(getUserCartData.rejected,(state,action)=>{
        state.Carterror=action.error.message;
        state.loading=false;
      })
      
    }
  })

  
export default CartSlice.reducer