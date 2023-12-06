import { createSlice,createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
const url="https://e-coomercebackend.onrender.com"


export const getAllProducts=createAsyncThunk("/get/AllProduct",async({search,page,minPrice,maxPrice,ratings,filter},thunkApi)=>{
  try {
    const query=`?search=${search}&page=${page}&minPrice=${minPrice}&maxPrice=${maxPrice}&ratings=${ratings}&filter=${filter}`
    const {data}=await axios.get(`${url}/api/v1/product/getAll${query}`);
    return data
  } catch (error) {
    throw error.response.data.msg
  }
 
})

export const getProuctDetails=createAsyncThunk("admin/product/:id",async({id})=>{
  try {
    const {data}=await axios.get(`${url}/api/v1/admin/product/${id}`);
    return data
  } catch (error) {
    throw error.response.data.msg
  }
 
})

export const AddReviews=createAsyncThunk("/User/Addreview",async({token,payload})=>{
  try {
    const headers={
      'Content-Type':'Application/json',
      'Authorization':token
    }
    const {data}=await axios.post(`${url}/api/v1/product/add/reviews`,payload,{headers});
    return data
  } catch (error) {
    throw error.response.data.msg
  }
 
})

export const AddProducts=createAsyncThunk("/admin/add/product",async({token,payload})=>{
  try {
    const headers={
      'Content-Type': 'multipart/form-data',
      'Authorization':token
    }
    const {data}=await axios.post(`${url}/api/v1/admin/product/add`,payload,{headers});
    return data
  } catch (error) {
    throw error.response.data.msg
  }
 
})

export const DeleteParticularProduct=createAsyncThunk("/admin/Delete/product/:id",async({id,token})=>{
  try {
    const headers={
      'Content-Type':'Application/json',
      'Authorization':token
    }
    const {data}=await axios.delete(`${url}/api/v1/admin/product/${id}`,{headers});
    return data
  } catch (error) {
    throw error.response.data.msg
  }
 
})
export const DeleteParticularProductImage=createAsyncThunk("/admin/delete/product/image/:id",async({id,token,payload})=>{
  try {
    const headers={
      'Content-Type':'Application/json',
      'Authorization':token
    }
    const {data}=await axios.put(`${url}/api/v1/admin/product/${id}`,payload,{headers});
    return data
  } catch (error) {
    throw error.response.data.msg
  }
 
})
export const UpdateParticularProduct=createAsyncThunk("/admin/update/product/:id",async({id,token,payload})=>{
  try {
    const headers={
      'Content-Type':'Application/json',
      'Authorization':token
    }
    const {data}=await axios.patch(`${url}/api/v1/admin/product/${id}`,payload,{headers});
    return data
  } catch (error) {
    throw error.response.data.msg
  }
 
})
export const GetUserReviews=createAsyncThunk("/admin/Users/review/:id",async({id,productId,token})=>{
  try {
    const headers={
      'Content-Type':'Application/json',
      'Authorization':token
    }
    const {data}=await axios.get(`${url}/api/v1/admin/product/reviews/${id}/${productId}`,{headers});
    return data
  } catch (error) {
    throw error.response.data.msg
  }
 
})
export const DeleteReviews=createAsyncThunk("/admin/delete/reviews/:id",async({id,productId,token})=>{
  try {
    const headers={
      'Content-Type':'Application/json',
      'Authorization':token
    }
    const {data}=await axios.delete(`${url}/api/v1/admin/product/reviews/${id}/${productId}`,{headers});
    return data
  } catch (error) {
    throw error.response.data.msg
  }
 
})
export const AdminProducts=createAsyncThunk("/admin/All/Products",async({token})=>{
  try {
    const headers={
      'Content-Type':'Application/json',
      'Authorization':token
    }
    const {data}=await axios.get(`${url}/api/v1/admin/all/product`,{headers});
    return data
  } catch (error) {
    throw error.response.data.msg
  }
 
})


const initialState={
  products:[],
  loading:false,
  error:null,
  productCount:0,
  resultPerPage:0,
  filteredProductsCount:0,
  productDetails:{},
  ReviewSuccess:false,
  ProductDeleted:false,
  msg:"",
  AllProducts:[],
  CreateProductSucess:false,
  updateSucess:false,
  DeleteReviewsSucess:false
}

const ProductReducer=createSlice({
  name:"AllProduct",
  initialState,
  reducers:{
    clearError:(state)=>{
      console.log("clearerror",state);
      state.error=null
    },
    clearReviewSuccess:(state)=>{
      state.ReviewSuccess=false;
      state.msg="";
    },
    ClearProductDelete:(state)=>{
      state.ProductDeleted=false
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(getAllProducts.pending,(state,action)=>{
      state.loading=true;
      state.error=null;
    })
    .addCase(getAllProducts.fulfilled,(state,action)=>{
      state.loading=false;
      state.products=action.payload.data;
      state.productCount=action.payload.productCount;
      state.resultPerPage=action.payload.resultPerPage;
      state.filteredProductsCount=action.payload.filteredProductsCount
    })
    .addCase(getAllProducts.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error.message;
    });
    builder.addCase(getProuctDetails.pending,(state,action)=>{
      state.loading=true;
      state.error=null;
    })
    .addCase(getProuctDetails.fulfilled,(state,action)=>{
      state.loading=false;
      state.productDetails=action.payload.data;
    })
    .addCase(getProuctDetails.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error.message;
    });
    builder.addCase(AddReviews.pending,(state,action)=>{
      state.loading=true;
      state.error=null;
      state.msg=""
    })
    .addCase(AddReviews.fulfilled,(state,action)=>{
      state.loading=false;
      state.ReviewSuccess=true;
      state.msg=action.payload.msg
    })
    .addCase(AddReviews.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error.message;
    });
    builder.addCase(DeleteParticularProduct.pending,(state,action)=>{
      state.loading=true;
      state.error=null;
    })
    .addCase(DeleteParticularProduct.fulfilled,(state,action)=>{
      state.loading=false;
      state.ProductDeleted=false;
    })
    .addCase(DeleteParticularProduct.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error.message;
    });
    builder.addCase(UpdateParticularProduct.pending,(state,action)=>{
      state.loading=true;
      state.error=null;
    })
    .addCase(UpdateParticularProduct.fulfilled,(state,action)=>{
      state.loading=false;
      state.updateSucess=true;
    })
    .addCase(UpdateParticularProduct.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error.message;
    });
    builder.addCase(DeleteReviews.pending,(state,action)=>{
      state.loading=true;
      state.error=null;
    })
    .addCase(DeleteReviews.fulfilled,(state,action)=>{
      state.loading=false;
      state.DeleteReviewsSucess=true;
    })
    .addCase(DeleteReviews.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error.message;
    });
    builder.addCase(GetUserReviews.pending,(state,action)=>{
      state.loading=true;
      state.error=null;
    })
    .addCase(GetUserReviews.fulfilled,(state,action)=>{
      state.loading=false;
      state.productDetails=action.payload.data;
    })
    .addCase(GetUserReviews.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error.message;
    });
    builder.addCase(AdminProducts.pending,(state,action)=>{
      state.loading=true;
      state.error=null;
    })
    .addCase(AdminProducts.fulfilled,(state,action)=>{
      state.loading=false;
      state.AllProducts=action.payload.data;
    })
    .addCase(AdminProducts.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error.message;
    });
    builder.addCase(AddProducts.pending,(state,action)=>{
      state.loading=true;
      state.error=null;
      state.CreateProductSucess=false;
    })
    .addCase(AddProducts.fulfilled,(state,action)=>{
      state.loading=false;
      state.CreateProductSucess=true;
    })
    .addCase(AddProducts.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error.message;
    });
  }
})
export const {clearError}=ProductReducer.actions;
export const {ClearProductDelete}=ProductReducer.actions;
export const {clearReviewSuccess}=ProductReducer.actions;
export default ProductReducer.reducer



