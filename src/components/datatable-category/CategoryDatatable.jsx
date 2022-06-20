import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { URL_API } from "../../helpers";
import { connect } from "react-redux";

import "./datatable.scss";

import Spinner from "../spinner/Spinner";
import Error from "../modals/Error";
import Success from "../modals/Success";

import { productData } from "../../actions";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import { Alert, Button, Container, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function createData(id, name) {
  return {
    id,
    name,
  };
}

const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
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

function EnhancedTable(props) {
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [onDelete, setOnDelete] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
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

  const [newCategory, setNewCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);

  let navigate = useNavigate();

  // Make axios request
  useEffect(() => {
    let fetchUrl = `${URL_API}/admin/categories?page=${
      page + 1
    }&limit=${rowsPerPage}`;
    //  ?page=${page + 1}&limit=${rowsPerPage};

    // console.log(fetchUrl);
    axios
      .get(fetchUrl)
      .then((res) => {
        setData(() => res.data.content);
        setTotalData(res.data.details);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, rowsPerPage, showSuccess]);

  let rows = [];

  for (let i = 0; i < data.length; i++) {
    rows.push(createData(data[i].id, data[i].name));
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

  const addHandler = (event) => {
    event.preventDefault();

    setLoading(true);
    console.log(newCategory);
    axios
      .post(URL_API + `/admin/categories/create`, {
        name: newCategory,
      })
      .then((res) => {
        setLoading(false);
        setNewCategory("");
        setShowSuccess({
          ...showSuccess,
          open: true,
          title: res.data.subject,
          description: res.data.message,
        });
      })
      .catch((err) => {
        setLoading(false);
        setNewCategory("");
        setShowError({
          ...showError,
          open: true,
          title: err.response.data.subject,
          description: err.response.data.message,
        });
      });
  };

  const editHandler = (event, row) => {
    setEditCategoryId(row.id);
    setCategoryName(row.name);
  };

  const editChangeHandler = (event) => {
    setCategoryName(event.target.value);
  };

  const editSubmitHandler = () => {
    axios
      .patch(URL_API + `/admin/categories/${editCategoryId}/update`, {
        name: categoryName,
      })
      .then((res) => {
        setLoading(false);
        setShowSuccess({
          ...showSuccess,
          open: true,
          title: res.data.subject,
          description: res.data.message,
        });
        setEditCategoryId(null);
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

  const deleteHandler = (event) => {
    event.preventDefault();

    console.log("deleted");

    setOnDelete(false);
    setLoading(true);

    axios
      .delete(URL_API + `/admin/categories/${categoryId}/delete`)
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
    <Container sx={{ width: "100%" }} maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "25px 0",
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontSize: "1.5rem" }}>Categories List</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          // margin: "-60px 0 25px 0",
          marginBottom: "20px",
          width: "100%",
        }}
      >
        <TextField
          placeholder="Add new category..."
          onChange={(event) => {
            console.log(event.target.value);
            setNewCategory(event.target.value);
          }}
          sx={{
            position: "relative",
            borderRadius: "10px",
            marginRight: "10px",
            // width: "80%",
          }}
          size="small"
          value={newCategory}
        />

        <Button variant="contained" onClick={addHandler}>
          Add
        </Button>
      </Box>
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

                    return editCategoryId != row.id ? (
                      // Read Ony
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          sx={{ margin: "auto", textAlign: "center" }}
                        >
                          {row.id}
                        </TableCell>
                        <TableCell align="center">{row.name}</TableCell>

                        <TableCell align="center">
                          <Box
                            className="cellAction"
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              variant="outlined"
                              sx={{
                                padding: "2px 0",
                                marginRight: "5px",
                              }}
                              color="success"
                              onClick={(event) => editHandler(event, row)}
                            >
                              <EditIcon fontSize="small" />
                            </Button>
                            {/* </Link> */}
                            <Button
                              variant="outlined"
                              sx={{
                                // marginLeft: "3px",
                                padding: "2px 0",
                              }}
                              color="error"
                              onClick={() => {
                                setOnDelete(true);
                                setCategoryId(row.id);
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : (
                      // Edit
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          sx={{ margin: "auto", textAlign: "center" }}
                        >
                          {row.id}
                        </TableCell>
                        {/* <TableCell align="center">{row.name}</TableCell> */}

                        <TableCell align="center">
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            required={true}
                            name="name"
                            placeholder="Enter a category name..."
                            onChange={editChangeHandler}
                            value={categoryName}
                          />
                        </TableCell>

                        <TableCell align="center">
                          <Box
                            className="cellAction"
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              variant="outlined"
                              sx={{
                                padding: "2px 0",
                                marginRight: "5px",
                              }}
                              color="success"
                              onClick={editSubmitHandler}
                            >
                              <CheckIcon fontSize="small" />
                            </Button>
                            {/* </Link> */}
                            <Button
                              variant="outlined"
                              sx={{
                                // marginLeft: "3px",
                                padding: "2px 0",
                              }}
                              color="error"
                              onClick={() => {
                                setEditCategoryId(null);
                              }}
                            >
                              <CloseIcon fontSize="small" />
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
            <strong>Category is not found. Please check your query!</strong>
          </Alert>
        </Box>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTable);
