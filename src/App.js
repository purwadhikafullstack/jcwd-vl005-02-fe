import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import AdminRouter from "./AdminRouter";
import UserRouter from "./UserRouter";


const API_URL = "http://localhost:2000";
function App() {
  // global state
  const global = useSelector((state) => state);
  console.log("Global:", global);
  const dispatch = useDispatch();

  // KEEP LOGIN
  // side effect
  useEffect(() => {
    const id = localStorage.getItem("token");

    console.log('myToken:', id)

    Axios.get(API_URL + `/users/keeplogin`, {
      headers: {
        "Auth-Token": id
      }
    })
      .then(respond => {
        dispatch({ type: "LOGIN", payload: respond.data });
        console.log("User Status:", respond.data.is_verified);
      })
      .catch(error => {
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
