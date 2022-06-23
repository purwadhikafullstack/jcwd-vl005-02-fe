import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserHome from "./pages/user/UserHome";
import Navbar from "./components/user/Navbar";
import Footer from "./components/user/Footer";
import UserProducts from "./pages/user/UserProducts.";
import NavbarDrawer from "./components/admin/NavbarDrawer.tsx";
import AppRoutes from "./Routes";
import UserLogin from "./pages/user/userLogin";
import ForgotPassword from "./pages/user/forgotPassword";
import ResetPassword from "./pages/user/resetPassword";


const API_URL = "http://localhost:5000";
function App() {
  // global state
  const global = useSelector(state => state);
  console.log("Global:", global);
  const dispatch = useDispatch();

  // KEEP LOGIN
  // side effect
  useEffect(() => {
    const id = localStorage.getItem("token");

    // console.log('myToken:', id)

    Axios.get(API_URL + `/users/keeplogin`, {
      headers: {
        "Auth-Token": id
      }
    })
      .then(respond => {
        dispatch({ type: "LOGIN", payload: respond.data });
        console.log("User Status:", respond.data.status);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <ChakraProvider>
      {/* <NavbarDrawer children={<AppRoutes />} /> */}
      <Navbar></Navbar>
      
        <Routes>
          <Route path="/" element={<UserHome />}></Route>
          <Route path="/shop" element={<UserProducts />}></Route>
          <Route path="/login" element={<UserLogin />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route path="/resetpassword/:token"  element={<ResetPassword />}></Route>
        </Routes>
   
      <Footer></Footer>
    </ChakraProvider>
  );
}

export default App;
