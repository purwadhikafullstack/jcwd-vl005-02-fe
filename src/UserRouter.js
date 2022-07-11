import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/user/Navbar";
import ForgotPassword from "./pages/user/ForgotPassword";
import ResetPassword from "./pages/user/ResetPassword";
import UserHome from "./pages/user/UserHome";
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import UserProductDetails from "./pages/user/UserProductDetails";
import UserProducts from "./pages/user/UserProducts";
import Footer from "./components/user/Footer";
import UserCart from "./pages/user/UserCart";
import VerificationPage from "./pages/user/VerificationPage";
import { useSelector } from "react-redux";
import UserCheckout from "./pages/user/UserCheckout";
import UserInvoice from "./pages/user/UserInvoice";

function UserRouter() {
  const { email, username, id: userId } = useSelector((state) => state.user);
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route exact path="/" element={<UserHome />} />

        <Route path="/shop" element={<UserProducts />}></Route>
        {localStorage.getItem("token") ? (
          <Route path="/cart" element={<UserCart />}></Route>
        ) : (
          <Route path="/cart" element={<Navigate to="/" replace />} />
        )}
        {/* {userId ? (
          <Route path="/checkout" element={<UserCheckout />}></Route>
        ) : (
          <Route path="/checkout" element={<Navigate to="/" replace />} />
        )} */}
        <Route path="/checkout" element={<UserCheckout />}></Route>
        <Route path="/invoice" element={<UserInvoice />}></Route>

        <Route path="/products">
          <Route index element={<UserProducts />} />
          <Route path=":productId" element={<UserProductDetails />} />
        </Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/register" element={<UserRegister />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/resetpassword/:token" element={<ResetPassword />}></Route>
        <Route
          path="/authentication/:token"
          element={<VerificationPage />}
        ></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default UserRouter;
