import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { URL_API } from "../../helpers";

const ProductDatatable = () => {
  const productId = 1;
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Name",
      width: 230,
      editable: true,
    },
    {
      field: "picture",
      headerName: "Image",

      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.picture} alt="product" />
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 230,
    },

    {
      field: "stock",
      headerName: "Stock (pack)",
      width: 100,
    },
    {
      field: "volume",
      headerName: "Volume (qty/pack)",
      width: 140,
    },
    {
      headerName: "Total Qty",
      width: 100,
      renderCell: (params) => {
        return <div>{params.row.stock * params.row.volume}</div>;
      },
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 100,
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>{" "}
            <Link
              to={`/products/update/${productId}`}
              style={{ textDecoration: "none" }}
            >
              <div className="updateButton">Update</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  // Make axios request
  useEffect(() => {
    axios
      .get(URL_API + `/admin/products`)
      .then((res) => {
        setData(res.data.content);

        console.log(res.data.content);
      })
      .catch((err) => {
        console.log(err);
        // props.getLoading(false);
        // props.getError(
        //   true,
        //   err.response.data.subject,
        //   err.response.data.message
        // );
      });
  }, []);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Products
        <Link to="/products/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        // checkboxSelection
        density="standard"
      />
    </div>
  );
};

export default ProductDatatable;
