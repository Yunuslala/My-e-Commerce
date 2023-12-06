import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = "https://e-coomercebackend.onrender.com"

export const getAllOrders = createAsyncThunk(
  "/get/AllOrders",
  async ({ token }, thunkApi) => {
    try {
       const headers = {
            'Content-Type': 'application/json',
          'Authorization': `${token}`,
          };
          
      const { data } = await axios.get(`${url}/api/v1/order`, { headers });
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  }
);

export const getUserOrder = createAsyncThunk(
  "/User/Order/:id",
  async ({token }) => {
    try {
       const headers = {
            'Content-Type': 'application/json',
          'Authorization': `${token}`,
          };
          
      const { data } = await axios.get(`${url}/api/v1/order/User/me`, {
        headers,
      });
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  }
);

export const GetSingleOrder = createAsyncThunk(
  "/Order/:id",
  async ({ id, token }) => {
    try {
       const headers = {
            'Content-Type': 'application/json',
          'Authorization': `${token}`,
          };
          
      const { data } = await axios.get(`${url}/api/v1/order/${id}`, {
        headers,
      });
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  }
);

export const DeleteUserOrder = createAsyncThunk(
  "/delete/Order/:id",
  async ({ id, token }) => {
    try {
       const headers = {
            'Content-Type': 'application/json',
          'Authorization': `${token}`,
          };
          
      const { data } = await axios.delete(`${url}/api/v1/order/${id}`, {
        headers,
      });
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  }
);

export const UpdateOrderStatus = createAsyncThunk(
  "/Update/Order/:id",
  async ({ id, token,payload }) => {
    try {
       const headers = {
            'Content-Type': 'application/json',
          'Authorization': `${token}`,
          };
          
      const { data } = await axios.patch(`${url}/api/v1/order/${id}`,payload, {
        headers,
      });
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  }
);

export const CreateOrder = createAsyncThunk(
  "/Create/Order/:id",
  async ({ token, payload }) => {
    try {
       const headers = {
            'Content-Type': 'application/json',
          'Authorization': `${token}`,
          };
          console.log("orderPayload",payload);
      const { data } = await axios.post(`${url}/api/v1/order`, payload, {
        headers,
      });
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  }
);

const initialState = {
  AllOrders: [],
  loading: false,
  error: null,
  UserOrders: [],
  IndividualOrder: {},
  sucess: false,
  deleteOrder:false,
  msg: "",
};

const OrderSlice = createSlice({
  name: "AllProduct",
  initialState,
  reducers: {
    clearError: (state) => {
      console.log("clearerror", state);
      state.error = null;
    },
  RemoveDeleteOrder:(state)=>{
    state.deleteOrder=false;
  },
  ClearMessage:(state)=>{
    state.msg=""
  },
  clearSucess:(state)=>{
    state.sucess=false;
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state, action) => {
        state.loading = true;
        state.sucess = false;
        state.msg = "";
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.AllOrders = action.payload.data;
        state.sucess = true;
        state.msg = action.payload.msg;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.msg = "";
      });

    builder
      .addCase(CreateOrder.pending, (state, action) => {
        state.sucess = false;
        state.loading = true;
        state.msg = "";
      })
      .addCase(CreateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload.data;
        state.sucess = true;
        state.msg = action.payload.msg;
      })
      .addCase(CreateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.msg = "";
      });
    builder
      .addCase(DeleteUserOrder.pending, (state, action) => {
        state.loading = true;
        state.sucess = false;
        state.msg = "";
      })
      .addCase(DeleteUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteOrder = true;
        state.msg = action.payload.msg;
      })
      .addCase(DeleteUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.msg = "";
      });
    builder
      .addCase(GetSingleOrder.pending, (state, action) => {
        state.loading = true;
        state.sucess = false;
        state.msg = "";
      })
      .addCase(GetSingleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.msg = action.payload.msg;
        state.IndividualOrder = action.payload.data;
      })
      .addCase(GetSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.msg = "";
      });
    builder
      .addCase(getUserOrder.pending, (state, action) => {
        state.loading = true;
        state.sucess = false;
        state.msg = "";
      })
      .addCase(getUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.UserOrders = action.payload.data;
        state.msg = action.payload.msg;
      })
      .addCase(getUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.msg = "";
      });
      builder
      .addCase(UpdateOrderStatus.pending, (state, action) => {
        state.loading = true;
        state.sucess = false;
        state.msg = "";
      })
      .addCase(UpdateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.msg = action.payload.msg;
      })
      .addCase(UpdateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.msg = "";
      });
  },
});

export default OrderSlice.reducer;

export const { clearError } = OrderSlice.actions;
export const {RemoveDeleteOrder}=OrderSlice.actions;
export const {ClearMessage}=OrderSlice.actions;
export const  {clearSucess}=OrderSlice.actions;
