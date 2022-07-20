import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import AdminRouter from "./AdminRouter";
import UserRouter from "./UserRouter";
import Cookies from "js-cookie";

const API_URL = process.env.REACT_APP_URL_API;
function App() {
  // IF NOT REMEMBER ME
  const isChecked = localStorage.getItem("isChecked");
  const value = Cookies.get("loginstatus");

  // console.log('cek:',isChecked)
  // console.log(typeof isChecked); // string

  // const a = false
  // const b = true
  // console.log(typeof a) // bool

  if (isChecked == "false") {
    console.log("STEP 1");
    if (!value) {
      localStorage.removeItem("token");
      localStorage.removeItem("isChecked");
      // console.log("hapus token");
    }
  }

  // global state
  const global = useSelector((state) => state);
  // console.log("Global:", global);
  const dispatch = useDispatch();

  // KEEP LOGIN
  // side effect
  useEffect(() => {
    const id = localStorage.getItem("token");

    // console.log("myToken:", id);

    Axios.get(API_URL + `/users/keeplogin`, {
      headers: {
        "Auth-Token": id,
      },
    })
      .then((respond) => {
        dispatch({ type: "LOGIN", payload: respond.data });
        // console.log("User Status:", respond.data.is_verified);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/admin/*" element={<AdminRouter />} />
        <Route path="/*" element={<UserRouter />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
