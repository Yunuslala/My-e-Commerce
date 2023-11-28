import { configureStore } from '@reduxjs/toolkit'
// import { AllproductReducer } from './Reducers/ProductSlices/Product.Reducer'
import AuthSlice from "./Reducers/UserSlices/Auth.Slice"
import ProductSlice from './Reducers/ProductSlices/Product.slice'
import CategorySlice from './Reducers/ProductSlices/Category.slice'
import CartSlice from "./Reducers/ProductSlices/Cart.slice";
import  OrderSlice from "./Reducers/ProductSlices/OrderSlice"
export const store = configureStore({
  reducer: {
    AuthSlice,
    ProductSlice,
    CategorySlice,
    CartSlice,
    OrderSlice
  }
})


