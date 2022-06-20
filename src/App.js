import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import ProductList from "./pages/list-products/ProductList";
import Update from "./pages/update/Update";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Product from "./components/product-details/ProductDetails";
import ProductDetailsPage from "./pages/detail-product/ProductDetailsPage";
import CategoriesList from "./pages/list-categories/CategoriesList";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Nunito",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="users">
                <Route index element={<List />} />
                <Route path=":userId" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={userInputs} title="Add New User" />}
                />
              </Route>
              <Route path="products">
                <Route index element={<ProductList />} />
                <Route path=":productId" element={<ProductDetailsPage />} />
                <Route path="new" element={<New />} />
                <Route
                  path="update/:productId"
                  element={
                    <Update inputs={productInputs} title="Update Product" />
                  }
                />
              </Route>
              <Route path="categories">
                <Route index element={<CategoriesList />} />
                <Route path=":productId" element={<ProductDetailsPage />} />
                <Route path="new" element={<New />} />
                <Route
                  path="update/:productId"
                  element={
                    <Update inputs={productInputs} title="Update Product" />
                  }
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
