// import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
// import List from "./pages/list/List";
// import Single from "./pages/single/Single";
// import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { productInputs, userInputs } from "./formSource";
// import "./style/dark.scss";
// import { useContext } from "react";
// import { DarkModeContext } from "./context/darkModeContext";
// import ProductList from "./pages/list-products/ProductList";
// import Update from "./pages/update/Update";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { Typography } from "@mui/material";
// import Product from "./components/product-details/ProductDetails";
// import ProductDetailsPage from "./pages/detail-product/ProductDetailsPage";
// import CategoriesList from "./pages/list-categories/CategoriesList";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminNewProduct from "./pages/admin/AdminNewProduct";
import AdminUpdateProduct from "./pages/admin/AdminUpdateProduct";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminProductDetails from "./pages/admin/AdminProductDetails";
import UserHome from "./pages/user/UserHome";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Raleway",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

function AppRoutes() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<UserHome />} />
            {/* <Route path="login" element={<AdminLogin />} /> */}
            {/* <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route> */}
            {/* <Route path="products">
              <Route index element={<AdminProducts />} />
              <Route path="new" element={<AdminNewProduct />} />
              <Route
                path="update/:productId"
                element={<AdminUpdateProduct />}
              />
              <Route path=":productId" element={<AdminProductDetails />} />
            </Route>
            <Route path="categories">
              <Route index element={<AdminCategories />} />
            </Route> */}
          </Route>

          <Route path="/admin">
            {/* <Route index element={<AdminHome />} /> */}
            {/* <Route path="login" element={<AdminLogin />} /> */}
            {/* <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route> */}
            <Route path="products">
              <Route index element={<AdminProducts />} />
              <Route path="new" element={<AdminNewProduct />} />
              <Route
                path="update/:productId"
                element={<AdminUpdateProduct />}
              />
              <Route path=":productId" element={<AdminProductDetails />} />
            </Route>
            <Route path="categories">
              <Route index element={<AdminCategories />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default AppRoutes;
