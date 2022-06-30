import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/user/Navbar";
import ForgotPassword from "./pages/user/forgotPassword";
import ResetPassword from "./pages/user/resetPassword";
import UserHome from "./pages/user/UserHome";
import UserLogin from "./pages/user/userLogin";
import UserProductDetails from "./pages/user/UserProductDetails";
import UserProducts from "./pages/user/UserProducts";
import Footer from "./components/user/Footer";
import UserCart from "./pages/user/UserCart";

function UserRouter() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route exact path="/" element={<UserHome />} />

        <Route path="/shop" element={<UserProducts />}></Route>
        <Route path="/cart" element={<UserCart />}></Route>
        <Route path="/products">
          <Route index element={<UserProducts />} />
          <Route path=":productId" element={<UserProductDetails />} />
        </Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/resetpassword/:token" element={<ResetPassword />}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default UserRouter;
