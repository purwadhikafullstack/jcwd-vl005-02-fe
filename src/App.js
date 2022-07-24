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
  // IF NOT REMEMBER ME USER
  const isChecked = localStorage.getItem("isChecked");
  const value = Cookies.get("loginstatus");

  if (isChecked == "false") {
    // console.log("STEP 1");
    if (!value) {
      localStorage.removeItem("token");
      localStorage.removeItem("isChecked");
    }
  }

  // IF NOT REMEMBER ME ADMIN
  const isCheckedAdmin = localStorage.getItem("isCheckedAdmin");
  const valueAdmin = Cookies.get("loginstatusadmin");

  if (isCheckedAdmin == "false") {
    // console.log("STEP 1");
    if (!valueAdmin) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("isCheckedAdmin");
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

  useEffect(() => {
    const idAdmin = localStorage.getItem("adminToken");

    // console.log("myToken:", id);

    Axios.get(API_URL + `/admin/currentadmin`, {
      headers: {
        "Auth-Token-Admin": idAdmin,
      },
    })
      .then((respond) => {
        dispatch({ type: "ADMINLOGIN", payload: respond.data });
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
