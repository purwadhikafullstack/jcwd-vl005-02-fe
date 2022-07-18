import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import ThemeProvider from "../../theme";
import Axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
// import "./AdminDataUserTransactions.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import { Button as Tombol, DatePicker, version, Typography } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import Page from "../../components/admin/Page";
const { RangePicker } = DatePicker;
const { Title } = Typography;

const AdminManageUsers = () => {
  const API_URL = process.env.REACT_APP_URL_API;
  const [pageSize, setPageSize] = useState(5);
  const [usersData, setUsersData] = useState([]);
  const columns = [
    {
      field: "id",
      identity: true,
      headerName: "ID",
      width: 50,
      // headerAlign: "center",
    },
    {
      field: "name",
      identity: true,
      headerName: "Name",
      width: 200,
      // headerAlign: "center",
    },
    {
      field: "username",
      headerName: "Username",
      width: 150,
      editable: false,
      // headerAlign: "center",
    },

    {
      field: "email",
      headerName: "Email",
      width: 250,
      editable: false,
    },
    {
      field: "is_verified",
      headerName: "Is Verified",
      width: 100,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <button className={"widgetLgButton " + params.row.is_verified}>
              {params.row.is_verified}
            </button>
          </>
        );
      },
    },
    {
      field: "is_active",
      headerName: "Is Active",
      width: 100,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <button className={"widgetLgButton " + params.row.is_active}>
              {params.row.is_active}
            </button>
          </>
        );
      },
    },

    {
      field: "created_at",
      headerName: "Created At",
      width: 180,
      editable: false,
      // moment.js
      valueFormatter: (params) => moment(params?.value).format("LLL"),
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      editable: false,
    },
  ];

  useEffect(() => {
    Axios.get(API_URL + `/admin/users`)
      .then((respond) => {
        setUsersData(respond.data);
        // console.log(respond.data);
        // console.log("data:", respond.data);

        // save user data to global state
        // dispatch({ type: "DATA_TRANSACTIONS", payload: respond.data });

        setUsersData(respond.data);
        console.log(respond.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <ThemeProvider>
      <Page title="Manage Users">
        <div className="App">
          <Title level={3}>Users</Title>
        </div>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            // getRowId={(dataTransaction) => dataTransaction.id}
            rows={usersData}
            columns={columns}
            autoHeight={true}
            // checkboxSelection
            disableSelectionOnClick
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20, 100]}
            pagination
          />
        </Box>
      </Page>
    </ThemeProvider>
  );
};

export default AdminManageUsers;
