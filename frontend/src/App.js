import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Layouts/Header/Header";
import Footer from "./Components/Layouts/Footer/Footer";
import Home from "./Components/Home/Home";
import ProductDetails from "./Components/Products/ProductDetails";
import Product from "./Components/Products/Product";
import Search from "./Components/Products/Search";
import LoginSignup from "./Components/Auth/LoginSignup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProfile } from "./Components/Redux/Reducers/UserSlices/Auth.Slice";
import UserOption from "./Components/Layouts/Header/UserOption";
import UserProfile from "./Components/Auth/UserProfile";
import Cart from "./Components/Cart/Cart";
import Order from "./Components/Orders/Order";
import UpdateProfile from "./Components/Auth/UpdateProfile";
import ChangePassword from "./Components/Auth/ChangePassword";
import ForgetPassword from "./Components/Auth/ForgetPassword";
import ResetPassword from "./Components/Auth/ResetPassword";
import ProtectedRoute from "./Components/Route/ProtectedRoute";
import Shipping from "./Components/Cart/Shipping";
import ConfirmOrder from "./Components/Cart/ConfirmOrder";
import StripeCheckout from "./Components/Cart/StripeCheckout";
import OrderSucess from "./Components/Cart/OrderSucess";
import OrderDetails from "./Components/Orders/OrderDetails";

function App() {
  const Dispatch = useDispatch();

  const token = localStorage.getItem("meToken");
  const { loginSucess, LoginUser } = useSelector((state) => state.AuthSlice);


  useEffect(() => {
    if (token) {
      Dispatch(GetProfile(token));
    }
  }, []);



  return (
    <div className="App">
      <Router>
        <Header />
        {loginSucess && <UserOption LoginUser={LoginUser} />}
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Product />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/account" element={<UserProfile />} />
          <Route path="/edit/profile" element={<UpdateProfile />} />
          <Route path="/Change/Password" element={<ChangePassword />} />
          <Route path="/forget/Password" element={<ForgetPassword />} />
          <Route
            path="/reset/password/:resetToken"
            element={<ResetPassword />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/Cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/Confirm/Order" element={<ConfirmOrder />} />
            <Route path="/process/payment" element={<StripeCheckout/>} />
            <Route path="/sucess" element={<OrderSucess/>} />
            <Route path="/orders/me" element={<Order/>} />
            <Route path="/orders/me/:id" element={<OrderDetails/>} />

          </Route>
         
        </Routes>
      
        <Footer />
      </Router>
    </div>
  );
}

export default App;
