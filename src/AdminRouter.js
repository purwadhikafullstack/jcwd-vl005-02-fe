import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminNewProduct from "./pages/admin/AdminNewProduct";
import AdminUpdateProduct from "./pages/admin/AdminUpdateProduct";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminProductDetails from "./pages/admin/AdminProductDetails";
import NavbarDrawer from "./components/admin/NavbarDrawer";
import { ChakraProvider } from "@chakra-ui/react";
import AdminTransaction from "./pages/admin/AdminTransaction";
import TransactionProof from "./pages/admin/TransactionProof";
import AdminReports from "./pages/admin/AdminReports";
import AdminManageUsers from "./pages/admin/AdminManageUsers";

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

const Content = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route exact path="/" element={<AdminProducts />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="/products/new" element={<AdminNewProduct />} />
        <Route
          path="/products/update/:productId"
          element={<AdminUpdateProduct />}
        />
        <Route path="/products/:productId" element={<AdminProductDetails />} />
        <Route path="/categories" element={<AdminCategories />} />
        <Route path="/transaction/:invoiceId" element={<TransactionProof />} />
        <Route path="/transactions" element={<AdminTransaction />} />
        <Route path="/reports" element={<AdminReports />} />
        <Route path="/users" element={<AdminManageUsers />} />
      </Routes>
    </ThemeProvider>
  );
};

function AdminRouter() {
  return (
    <>
      <ChakraProvider>
        <NavbarDrawer children={<Content />} />
      </ChakraProvider>
    </>
  );
}

export default AdminRouter;
