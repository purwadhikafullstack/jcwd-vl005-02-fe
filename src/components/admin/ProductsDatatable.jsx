import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { URL_API } from "../../helpers";
import { connect } from "react-redux";
import Success from "../general/Modals/Success";
import Error from "../general/Modals/Error";
import Spinner from "../general/Spinner/Spinner";
import { productData } from "../../actions";

import {
  Alert,
  Button,
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Paper,
  Switch,
  FormControlLabel,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterDrawer from "./FilterDrawer";
import SortDrawer from "./SortDrawer";
import FilterSearch from "./FilterSearch";

function createData(
  id,
  name,
  picture,
  category,
  category_name,
  description,
  price,
  stock,
  volume,
  stock_in_unit,
  unit
) {
  return {
    id,
    name,
    picture,
    category,
    category_name,
    description,
    price,
    stock,
    volume,
    stock_in_unit,
    unit,
  };
}

const headCells = [
  {
    id: "no",
    numeric: true,
    disablePadding: true,
    label: "No.",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "picture",
    numeric: false,
    disablePadding: false,
    label: "Picture",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price (Rp)",
  },
  {
    id: "stock",
    numeric: true,
    disablePadding: false,
    label: "Stock In Package",
  },
  {
    id: "volume",
    numeric: true,
    disablePadding: false,
    label: "Volume",
  },
  {
    id: "stock_in_unit",
    numeric: false,
    disablePadding: false,
    label: "Stock In Unit",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

function ProductTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sx={{ padding: "10px 20px" }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function ProductsDatatable(props) {
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [onDelete, setOnDelete] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [productId, setProductId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState({
    open: false,
    title: "",
    description: "",
  });
  const [showError, setShowError] = useState({
    open: false,
    title: "",
    description: "",
  });

  const [sort, setSort] = useState({ property: "", order: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilterSelected, setCategoryFilterSelected] = useState("");

  let navigate = useNavigate();

  // Make axios request
  useEffect(() => {
    let fetchUrl;
    if (sort.property != "" && sort.order != "" && searchQuery != "") {
      fetchUrl = `${URL_API}/admin/products?page=${
        page + 1
      }&limit=${rowsPerPage}&sortBy=${sort.property}&order=${
        sort.order
      }&name=${searchQuery}`;
    } else if (sort.property != "" && sort.order != "") {
      fetchUrl = `${URL_API}/admin/products?page=${
        page + 1
      }&limit=${rowsPerPage}&sortBy=${sort.property}&order=${sort.order}`;
    } else if (searchQuery != "") {
      fetchUrl = `${URL_API}/admin/products?name=${searchQuery}`;
    } else if (categoryFilterSelected != "") {
      fetchUrl = `${URL_API}/admin/products?category=${categoryFilterSelected}`;
    } else {
      fetchUrl = `${URL_API}/admin/products?page=${
        page + 1
      }&limit=${rowsPerPage}`;
    }
    axios
      .get(fetchUrl)
      .then((res) => {
        setData(() => res.data.content);
        setTotalData(res.data.details);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    page,
    rowsPerPage,
    showSuccess,
    sort,
    searchQuery,
    categoryFilterSelected,
  ]);

  let rows = [];

  for (let i = 0; i < data.length; i++) {
    rows.push(
      createData(
        data[i].id,
        data[i].name,
        data[i].picture,
        data[i].category,
        data[i].category_name,
        data[i].description,
        data[i].price,
        data[i].stock,
        data[i].volume,
        data[i].stock_in_unit,
        data[i].unit
      )
    );
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // console.log(event.target.value);
    setRowsPerPage(parseInt(event.target.value));
    // Disini buat request ke API untuk menampilkan x jumlah data
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const deleteHandler = (event) => {
    event.preventDefault();

    console.log("deleted");

    setOnDelete(false);
    setLoading(true);

    axios
      .delete(URL_API + `/admin/product/${productId}/delete`)
      .then((res) => {
        setLoading(false);
        setShowSuccess({
          ...showSuccess,
          open: true,
          title: res.data.subject,
          description: res.data.message,
        });
      })
      .catch((err) => {
        setLoading(false);
        setShowError({
          ...showError,
          open: true,
          title: err.response.data.subject,
          description: err.response.data.message,
        });
      });
  };

  return (
    <Container sx={{ width: "100%" }} maxWidth="xl">
      {/* Judul Page */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "25px 0",
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontSize: "1.5rem" }}>Products List</Typography>
      </Box>
      {/*End - Judul Page */}

      {/* Filter and sorting utility */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          margin: "20px 0 25px 0",
        }}
      >
        <FilterSearch setSearchQuery={setSearchQuery} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          margin: "-60px 0 25px 0",
        }}
      >
        <FilterDrawer
          categoryFilterSelected={categoryFilterSelected}
          setCategoryFilterSelected={setCategoryFilterSelected}
        />
        <SortDrawer sort={sort} setSort={setSort} />
        <Link to="/admin/products/new" style={{ textDecoration: "none" }}>
          <Button variant="contained">Add New </Button>
        </Link>
      </Box>
      {/* End - Filter and sorting utility */}

      {/* Data product beserta delete dan update functionality */}
      {data.length ? (
        <Box>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Spinner loading={loading} />

              <Error
                withOptions={true}
                errorTitle="Confirmation"
                errorDescription="Are you sure to delete this product?"
                show={onDelete}
                close={() => setOnDelete(false)}
                confirm={deleteHandler}
              />

              <Success
                withOptions={true}
                successTitle="Confirmation"
                successDescription="Do you want to update this product?"
                show={onEdit}
                close={() => setOnEdit(false)}
                confirm={() => navigate(`/admin/products/update/${productId}`)}
              />

              <Error
                errorTitle={showError.title}
                errorDescription={showError.description}
                show={showError.open}
                close={() =>
                  setShowError({
                    open: false,
                    title: "",
                    description: "",
                  })
                }
              />

              <Success
                successTitle={showSuccess.title}
                successDescription={showSuccess.description}
                show={showSuccess.open}
                close={() =>
                  setShowSuccess({ open: false, title: "", description: "" })
                }
              />

              <Table
                sx={{ maxWidth: "100%", padding: "20px" }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <ProductTableHead />

                <TableBody>
                  {rows.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          sx={{ paddingLeft: "20px" }}
                        >
                          {index + 1 + rowsPerPage * page}
                        </TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "auto",
                            }}
                          >
                            <img
                              style={{
                                width: "75px",
                                height: "75px",
                                borderRadius: "10%",
                                objectFit: "cover",
                              }}
                              src={URL_API + row.picture}
                              alt="product"
                            />
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          {row.category_name}
                        </TableCell>
                        <TableCell align="center">{row.description}</TableCell>
                        <TableCell align="center">
                          {parseInt(row.price).toLocaleString("id-ID")}
                        </TableCell>

                        <TableCell align="center">{row.stock}</TableCell>
                        <TableCell align="center">
                          {parseInt(row.volume).toLocaleString("id-ID")}{" "}
                          {row.unit}
                        </TableCell>
                        <TableCell align="center">
                          {parseInt(row.stock_in_unit).toLocaleString("id-ID")}{" "}
                          {row.unit}
                        </TableCell>
                        <TableCell align="center">
                          <Box
                            className="cellAction"
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Link
                              to={`/admin/products/${row.id}`}
                              style={{ textDecoration: "none" }}
                            >
                              <Button
                                variant="outlined"
                                sx={{ marginBottom: "5px", padding: "2px 0" }}
                              >
                                <RemoveRedEyeIcon fontSize="small" />
                              </Button>
                            </Link>

                            <Button
                              variant="outlined"
                              sx={{
                                padding: "2px 0",
                                marginBottom: "5px",
                              }}
                              color="success"
                              onClick={() => {
                                setOnEdit(true);
                                setProductId(row.id);

                                axios
                                  .get(URL_API + `/admin/product/${row.id}`)
                                  .then((res) => {
                                    props.productData(res.data.content);
                                    console.log(res.data.content);
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                  });
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </Button>
                            <Button
                              variant="outlined"
                              sx={{
                                padding: "2px 0",
                              }}
                              color="error"
                              onClick={() => {
                                setOnDelete(true);
                                setProductId(row.id);
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalData} //total number of rows
              rowsPerPage={rowsPerPage} //content per page
              page={page} //page yang ditampilkan saat ini
              onPageChange={handleChangePage} //mengambil parameter page
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        </Box>
      ) : (
        <Box
          sx={{
            width: "500px",
            textAlign: "center",
            borderRadius: "5px",
            // border: "1px solid gray",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <Alert severity="warning">
            <strong>Product is not found. Please check your query!</strong>
          </Alert>
        </Box>
      )}
      {/* End - Data product beserta delete dan update functionality */}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    productName: state.productReducer.name,
    productDescription: state.productReducer.description,
    productCategory: state.productReducer.category,
    productPrice: state.productReducer.price,
    productStock: state.productReducer.stock,
    productVolume: state.productReducer.volume,
    productUnit: state.productReducer.unit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    productData: (data) => dispatch(productData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDatatable);
