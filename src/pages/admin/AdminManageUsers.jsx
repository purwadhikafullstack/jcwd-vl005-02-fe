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

import {
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  ChakraProvider,
  Button,
} from "@chakra-ui/react";
import {
  // Button ,
  DatePicker,
  Typography,
  Space,
} from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import Page from "../../components/admin/Page";
const { RangePicker } = DatePicker;
const { Title } = Typography;

const AdminManageUsers = () => {
  const API_URL = process.env.REACT_APP_URL_API;
  const [pageSize, setPageSize] = useState(5);
  const [usersData, setUsersData] = useState([]);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const selector = useSelector;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [confirm, setConfirm] = useState(false);
  const [confirm2, setConfirm2] = useState(false);
  const [idUser, setIdUser] = useState(null);

  const onButtonActive = (id) => {
    console.log(idUser);
    setIdUser(id);

    setConfirm(true);
  };
  const onButtonActive2 = (id) => {
    console.log(id);
    setIdUser(id);

    setConfirm2(true);
  };

  const handleActive = () => {
    setStatus("active");
    setStatus((statusbaru) => {
      console.log("Test:", idUser);
      const newStatus = {
        id: idUser,
        is_active: statusbaru,
      };
      Axios.patch(API_URL + `/admin/changeuserstatus`, newStatus)
        .then((respond) => {
          // save user data to global state
          dispatch({ type: "DATA_USERS", payload: respond.data });

          console.log(respond.data);
          // setDataTransaction(respond.data);
          // console.log("data:", respond.data);
        })
        .catch((error) => {
          console.log(error);
        });
      setConfirm(false);

      return status;
    });
  };

  const handleBanned = (id) => {
    console.log("id:", id);
    // const test = ;
    // console.log()
    setStatus("banned");
    // console.log(await getStatus())
    setStatus((statusbaru) => {
      console.log("test:", statusbaru);
      const newStatus = {
        id: idUser,
        is_active: statusbaru,
      };
      Axios.patch(API_URL + `/admin/changeuserstatus`, newStatus)
        .then((respond) => {
          // save user data to global state
          dispatch({ type: "DATA_USERS", payload: respond.data });

          console.log(respond.data);
          // setDataTransaction(respond.data);
          // console.log("data:", respond.data);
        })
        .catch((error) => {
          console.log(error);
        });
      setConfirm2(false);
      return status;
    });
  };

  const onBtnCancelConfirm = () => {
    setConfirm(false);
  };
  const onBtnCancelConfirm2 = () => {
    setConfirm2(false);
  };

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
      width: 150,
      editable: false,
      renderCell: (params) => {
        return (
          <ChakraProvider>
            <Space className="actionusers">
              {params.row.is_active == "active" ? (
                <>
                  <Button
                    onClick={() => onButtonActive2(params.row.id)}
                    size="sm"
                    bg={"red.500"}
                    color={"white"}
                    _hover={{ bg: "red.400" }}
                    ml={3}
                  >
                    Deactivate
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => onButtonActive(params.row.id)}
                  bg={"green.500"}
                  size="sm"
                  color={"white"}
                  _hover={{ bg: "green.400" }}
                  ml={3}
                >
                  Reactivate
                </Button>
              )}
            </Space>
          </ChakraProvider>
        );
      },
    },
  ];

  useEffect(() => {
    Axios.get(API_URL + `/admin/users`)
      .then((respond) => {
        setUsersData(respond.data);
        // save user data to global state
        dispatch({ type: "DATA_USERS", payload: respond.data });
        setUsersData(respond.data);
        console.log(respond.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const data = selector((state) => state.manageUsersReducer);
  return (
    <ThemeProvider>
      <Page title="Manage Users">
        <div className="App">
          <Title level={3}>Users</Title>
        </div>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            // getRowId={(dataTransaction) => dataTransaction.id}
            rowHeight={100}
            rows={data}
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
        <ChakraProvider>
          <AlertDialog isOpen={confirm}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Reactivate user
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure you want to reactivate this user?
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={onBtnCancelConfirm}>Cancel</Button>
                  <Button
                    onClick={handleActive}
                    w={"100px"}
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{ bg: "blue.500" }}
                    ml={3}
                  >
                    Yes
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>

          <AlertDialog isOpen={confirm2}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  deactivate confirmation
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure you want to deactivate this user?
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={onBtnCancelConfirm2}>Cancel</Button>
                  <Button
                    onClick={handleBanned}
                    w={"100px"}
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{ bg: "blue.500" }}
                    ml={3}
                  >
                    Yes
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </ChakraProvider>
      </Page>
    </ThemeProvider>
  );
};

export default AdminManageUsers;
