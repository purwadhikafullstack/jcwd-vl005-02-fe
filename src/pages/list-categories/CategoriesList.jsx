import "./categoriesList.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import CategoryDatatable from "../../components/datatable-category/CategoryDatatable";

const CategoriesList = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <CategoryDatatable />
      </div>
    </div>
  );
};

export default CategoriesList;
