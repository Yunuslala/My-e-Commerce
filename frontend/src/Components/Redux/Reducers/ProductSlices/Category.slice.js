import { createSlice,createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
const url="http://localhost:4500";

export const getAllCategory=createAsyncThunk('/get/Category',async()=>{
    try {
        const {data}=await axios.get(`${url}/api/v1/Category/getAll`);
        return data
      } catch (error) {
        throw error.response.data.msg
      }
})
export const clearError=createAction("clearError")


const initialState={
    Categories:[],
    loading:false,
    error:null
  }

const CategoryReducer=createSlice({
    name:"Cateogry",
    initialState,
    reducers:{
      clearError:(state)=>{
        console.log("clearerror",state);
        state.error=null
      }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllCategory.pending,(state,action)=>{
            state.loading=true;
          })
          .addCase(getAllCategory.fulfilled,(state,action)=>{
            state.loading=false;
            state.Categories=action.payload.data;
          })
          .addCase(getAllCategory.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
          });
    }
})

export default CategoryReducer.reducer