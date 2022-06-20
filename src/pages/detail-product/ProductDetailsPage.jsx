import "./productDetailsPage.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Product from "../../components/product-details/ProductDetails";

const ProductDetailsPage = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Product />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
