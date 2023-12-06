import { createSlice,createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
const url="https://e-coomercebackend.onrender.com"

export const getAllCategory=createAsyncThunk('/get/Category',async()=>{
    try {
        const {data}=await axios.get(`${url}/api/v1/Category/getAll`,);
        return data
      } catch (error) {
        throw error.response.data.msg
      }
})
export const CreateCategory=createAsyncThunk('/Add/Category',async({token,payload})=>{
  try {
    const headers={
      'Content-Type':'Application/json',
      'Authorization':token
    }
      const {data}=await axios.post(`${url}/api/v1/admin/Category/add`,payload,{headers});
      return data
    } catch (error) {
      throw error.response.data.msg
    }
})
export const DeleteCategory=createAsyncThunk('/delete/Category',async({id,token})=>{
  try {
    const headers={
      'Content-Type':'Application/json',
      'Authorization':token
    }
      const {data}=await axios.delete(`${url}/api/v1//admin/Category/${id}`,{headers});
      return data
    } catch (error) {
      throw error.response.data.msg
    }
})
export const UpdateCategory=createAsyncThunk('/update/Category',async({id,token,payload})=>{
  try {
    const headers={
      'Content-Type':'Application/json',
      'Authorization':token
    }
      const {data}=await axios.patch(`${url}/api/v1/Category/getAll/${id}`,payload,{headers});
      return data
    } catch (error) {
      throw error.response.data.msg
    }
})



const initialState={
    Categories:[],
    loading:false,
    error:null,
    Sucess:false,
  }

const CategoryReducer=createSlice({
    name:"Cateogry",
    initialState,
    reducers:{
      clearError:(state)=>{
        console.log("clearerror",state);
        state.error=null
      },
      ClearSucess:(state)=>{
        state.Sucess=false;
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
          builder.addCase(CreateCategory.pending,(state,action)=>{
            state.loading=true;
            state.Sucess=false;
          })
          .addCase(CreateCategory.fulfilled,(state,action)=>{
            state.loading=false;
            state.Sucess=true;
          })
          .addCase(CreateCategory.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
          });
          builder.addCase(DeleteCategory.pending,(state,action)=>{
            state.loading=true;
            state.Sucess=false;
          })
          .addCase(DeleteCategory.fulfilled,(state,action)=>{
            state.loading=false;
            state.Sucess=true;
          })
          .addCase(DeleteCategory.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
          });
          builder.addCase(UpdateCategory.pending,(state,action)=>{
            state.loading=true;
            state.Sucess=false;
          })
          .addCase(UpdateCategory.fulfilled,(state,action)=>{
            state.loading=false;
            state.Sucess=true;
          })
          .addCase(UpdateCategory.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
          });
    }
})

export const {ClearSucess}=CategoryReducer.actions;
export const {clearError}=CategoryReducer.actions;



export default CategoryReducer.reducer