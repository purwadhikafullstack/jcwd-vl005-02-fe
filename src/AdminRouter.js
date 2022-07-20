import { Navigate,Routes, Route } from "react-router-dom";
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
import AdminLogin from "./pages/admin/AdminLogin";
import AddNewAdmin from "./pages/admin/AddNewAdmin";
import AdminForgotPassword from "./pages/admin/AdminForgetPassword";
import AdminResetPassword from "./pages/admin/AdminResetPassword";

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
  // const ProtectedRoute = ({ user, children }) => {
  //   const user = "";
  //   if (!user) {
  //     return <Navigate to="/landing" replace />;
  //   }

  //   return children;
  // };
  const tokenAdmin = localStorage.getItem("adminToken");
  return (
    <ThemeProvider theme={theme}>
      {tokenAdmin ? (
        <Routes>
          <Route exact path="/" element={<AdminProducts />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="/products/new" element={<AdminNewProduct />} />
          <Route
            path="/products/update/:productId"
            element={<AdminUpdateProduct />}
          />
          <Route
            path="/products/:productId"
            element={<AdminProductDetails />}
          />
          <Route path="/categories" element={<AdminCategories />} />
          <Route path="/transactions" element={<AdminTransaction />} />
          <Route
            path="/transactions/:invoiceId"
            element={<TransactionProof />}
          />
          <Route path="/reports" element={<AdminReports />} />
          <Route path="/users" element={<AdminManageUsers />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/add-new-admin" element={<AddNewAdmin />} />
          <Route path="/forgetpassword" element={<AdminForgotPassword />} />
          <Route path="/resetpassword" element={<AdminResetPassword />} />
        </Routes>
      ) : (
        <Routes>
          <Route exact path="/" element={<Navigate to="/admin/login" replace />}/>
          <Route path="products" element={<Navigate to="/admin/login" replace />} />
          <Route path="/products/new" element={<Navigate to="/admin/login" replace />} />
          <Route
            path="/products/update/:productId"
            element={<Navigate to="/admin/login" replace />}
          />
          <Route
            path="/products/:productId"
            element={<Navigate to="/admin/login" replace />}
          />
          <Route path="/categories" element={<Navigate to="/admin/login" replace />} />
          <Route path="/transactions" element={<Navigate to="/admin/login" replace />}/>
          <Route
            path="/transactions/:invoiceId"
            element={<Navigate to="/admin/login" replace />}
          />
          <Route path="/reports" element={<Navigate to="/admin/login" replace />} />
          <Route path="/users" element={<Navigate to="/admin/login" replace />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/forgetpassword" element={<AdminForgotPassword />} />
          <Route path="/resetpassword" element={<AdminResetPassword />} />
        </Routes>
      )}
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
