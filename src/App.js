import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserHome from "./pages/user/UserHome";
import Navbar from "./components/user/Navbar";
import Footer from "./components/user/Footer";
import UserProducts from "./pages/user/UserProducts.";
import NavbarDrawer from "./components/admin/NavbarDrawer.tsx";
import AppRoutes from "./Routes";

function App() {
  return (
    <ChakraProvider>
      {/* <NavbarDrawer children={<AppRoutes />} /> */}
      <Navbar></Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserHome />}></Route>
          <Route path="/shop" element={<UserProducts />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </ChakraProvider>
  );
}

export default App;
