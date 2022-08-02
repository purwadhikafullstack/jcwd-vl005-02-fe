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
import { Button as Tombol, DatePicker, version, Typography, Space } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import Page from "../../components/admin/Page";
import { io } from "socket.io-client";
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

const BASE_URL = process.env.REACT_APP_URL_API;

const socket = io.connect(BASE_URL);

const { RangePicker } = DatePicker;
const { Title } = Typography;

const AdminTransaction = () => {
  const API_URL = process.env.REACT_APP_URL_API;
  const [startDate, setstartDate] = useState("");
  const [endDate, setendtDate] = useState("");
  const [month, setMonth] = useState("");
  const [dataTransaction, setDataTransaction] = useState([]);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const selector = useSelector;
  const [pageSize, setPageSize] = useState(10);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmApprove, setConfirmApprove] = useState(false);
  const [confirmReject, setConfirmReject] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [invoiceCode, setInvoiceCode] = useState(null);

  const onButtonApprove = (id, user_id, code) => {
    setInvoiceId(id);
    setUserId(user_id);
    setInvoiceCode(code);
    setConfirmApprove(true);
  };

  // Handle Approve
  const handleApprove = () => {
    console.log(`ID = ${invoiceId} user-id= ${userId} code= ${invoiceCode}`);
    const newStatus = {
      id: invoiceId,
      status: "Approved",
      month: month,
      startDate: startDate,
      endDate: endDate,
      userId: userId,
      message: `Your purchase with code ${invoiceCode} has been approved`,
      invoiceHeaderId: invoiceId,
      invoiceHeaderCode: invoiceCode,
    };
    console.log(newStatus);

    Axios.patch(
      API_URL + `/admin/change-transaction-status-approved`,
      newStatus
    )
      .then((respond) => {
        // save user data to global state
        dispatch({ type: "DATA_TRANSACTIONS", payload: respond.data });
        console.log("MASUK");
        console.log(respond.data);
        setDataTransaction(respond.data);
        // console.log("data:", respond.data);
        joinRoom(String(userId));
        sendNotification(
          `Your purchase ${invoiceCode} has been approved`,
          String(userId)
        );
      })
      .catch((error) => {
        console.log("masuk error");
        console.log(error);
      });
    setConfirmApprove(false);

    return status;
  };

  const onButtonReject = (id, user_id, code) => {
    setInvoiceId(id);
    setUserId(user_id);
    setInvoiceCode(code);

    setConfirmReject(true);
  };

  // Handle reject
  const handleReject = () => {
    const newStatus = {
      id: invoiceId,
      status: "Rejected",
      month: month,
      startDate: startDate,
      endDate: endDate,
      userId: userId,
      message: `Your purchase with code ${invoiceCode} has been rejected`,
      invoiceHeaderId: invoiceId,
      invoiceHeaderCode: invoiceCode,
    };
    Axios.patch(
      API_URL + `/admin/change-transaction-status-rejected`,
      newStatus
    )
      .then((respond) => {
        // save user data to global state
        dispatch({ type: "DATA_TRANSACTIONS", payload: respond.data });

        console.log(respond.data);
        setDataTransaction(respond.data);
        // console.log("data:", respond.data);
        joinRoom(String(userId));
        sendNotification(
          `Your purchase ${invoiceCode} has been rejected`,
          String(userId)
        );
      })
      .catch((error) => {
        console.log(error);
      });
    setConfirmReject(false);

    return status;
  };

  const onBtnCancelConfirmApprove = () => {
    setConfirmApprove(false);
  };
  const onBtnCancelConfirmReject = () => {
    setConfirmReject(false);
  };

  const joinRoom = (channel) => {
    console.log("Joining channel ", channel);
    socket.emit("join_channel", channel);
  };

  const sendNotification = (message, channel) => {
    console.log("Send notif");
    socket.emit("send_notification", { message, channel });
  };

  const onHandleMonth = (date, monthPicked) => {
    setMonth(monthPicked);
  };

  const onHandleDateRange = (date, dateRange) => {
    setstartDate(dateRange[0]);
    setendtDate(dateRange[1]);
  };

  const ondateRangeSubmit = () => {
    console.log("Start Date :", startDate);
    console.log("End Date :", endDate);
    // if (startDate === "" && endDate === "") {
    //   alert("Select the date range before submit");
    // }
    const dateRange = {
      startDate: startDate,
      endDate: endDate,
    };
    console.log(dateRange);
    Axios.post(API_URL + `/admin/transactiondaterange`, dateRange)
      .then((respond) => {
        // save user data to global state
        dispatch({ type: "DATA_TRANSACTIONS", payload: respond.data });
        setDataTransaction(respond.data);
        console.log("data:", respond.data);
        setMonth("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const ondMonthPickedSubmit = () => {
    const monthPicked = {
      month: month,
    };
    console.log(monthPicked);
    Axios.post(API_URL + `/admin/transactionbymonth`, monthPicked)
      .then((respond) => {
        // save user data to global state
        dispatch({ type: "DATA_TRANSACTIONS", payload: respond.data });
        // console.log(respond.data);
        // console.log(respond.data);
        setDataTransaction(respond.data);
        // console.log("data:", respond.data);
        // RESET STATE
        // month.current.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onButtonReset = () => {
    Axios.get(API_URL + `/admin/transaction`)
      .then((respond) => {
        // save user data to global state
        dispatch({ type: "DATA_TRANSACTIONS", payload: respond.data });

        console.log(respond.data);
        setDataTransaction(respond.data);
        console.log("data:", respond.data);

        setMonth("");
        setstartDate("");
        setendtDate("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(dataTransaction);

  const columns = [
    {
      field: "code",
      identity: true,
      headerName: "Invoice Code",
      width: 150,
      // headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Customer Name",
      width: 150,
      editable: false,
      // headerAlign: "center",
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      width: 150,
      editable: false,
      // headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      editable: false,
      // headerAlign: "center",
      renderCell: (params) => {
        function mysqlDate(date = new Date()) {
          return date.toISOString().split("T")[0];
        }
        const currentDate = mysqlDate();

        return (
          <>
            {params.row.status == "Approved" ? (
              <button className={"widgetLgButton " + "Approved"}>
                {params.row.status}
              </button>
            ) : params.row.status == "Rejected" ? (
              <button className={"widgetLgButton " + "Rejected"}>
                {params.row.status}
              </button>
            ) : !params.row.created_at &&
              params.row.exp_date_in_js.split("T")[0] < currentDate ? (
              <button className={"widgetLgButton " + "Rejected"}>
                Expired
              </button>
            ) : params.row.expired_date < params.row.created_at ? (
              <button className={"widgetLgButton " + "Rejected"}>
                Expired
              </button>
            ) : (
              <button className={"widgetLgButton " + "Pending"}>
                {params.row.status}
              </button>
            )}
          </>
        );
      },
    },
    {
      field: "total_payment",
      headerName: "Amount",
      width: 150,
      editable: false,
      // headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box>
            Rp {parseInt(params.row.total_payment).toLocaleString("id-ID")}
          </Box>
        );
      },
    },
    {
      field: "date",
      headerName: "Order Date",
      width: 200,
      editable: false,
      // headerAlign: "center",
      valueFormatter: (params) => moment(params?.value).format("LLL"),
    },
    {
      field: "expired_date",
      headerName: "Expired Date",
      width: 150,
      editable: false,
      // headerAlign: "center",
    },
    {
      field: "created_at",
      headerName: "Payment Date",
      width: 200,
      editable: false,
      // headerAlign: "center",
      type: "dateTime",
      renderCell: (params) => {
        return <Box>{params.row.created_at ? params.row.created_at : "-"}</Box>;
      },
    },
    {
      field: "picture",
      headerName: "Payment Proof",
      width: 100,
      editable: false,
      // headerAlign: "center",
      renderCell: (params) => {
        return (
          <>
            {params.row.created_at ? (
              <Link to={"/admin/transactions/" + params.row.id}>
                <button className="widgetSmButton">
                  <VisibilityIcon className="widgetSmIcon" />
                  Display
                </button>
              </Link>
            ) : (
              "-"
            )}
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      editable: false,
      // headerAlign: "center",
      renderCell: (params) => {
        return (
          <ChakraProvider>
            {/* <div className="action"> */}
            {params.row.created_at &&
            params.row.status != "Approved" &&
            params.row.status != "Rejected" ? (
              <>
                <IconButton
                  onClick={() =>
                    onButtonApprove(
                      params.row.id,
                      params.row.user_id,
                      params.row.code
                    )
                  }
                >
                  <CheckCircleSharpIcon style={{ color: "green" }} />
                </IconButton>
              </>
            ) : (
              <IconButton>
                <CheckCircleSharpIcon style={{ color: "grey" }} />
              </IconButton>
            )}

            {params.row.status != "Approved" &&
            params.row.status != "Rejected" ? (
              <>
                <IconButton
                  onClick={() =>
                    onButtonReject(
                      params.row.id,
                      params.row.user_id,
                      params.row.code
                    )
                  }
                >
                  <CancelSharpIcon style={{ color: "red" }} />
                </IconButton>
              </>
            ) : (
              <IconButton>
                <CancelSharpIcon style={{ color: "grey" }} />
              </IconButton>
            )}
          </ChakraProvider>
        );
      },
    },
  ];

  useEffect(() => {
    Axios.get(API_URL + `/admin/transaction`)
      .then((respond) => {
        dispatch({ type: "DATA_TRANSACTIONS", payload: respond.data });

        setDataTransaction(respond.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const data = selector((state) => state.transactionsReducer);

  return (
    <ThemeProvider>
      <div className="App">
        <Title level={3}>Transactions</Title>
        <DatePicker
          onChange={onHandleMonth}
          style={{ margin: 8 }}
          picker="month"
        />
        <Tombol
          onClick={ondMonthPickedSubmit}
          type="primary"
          style={{ marginLeft: 8 }}
        >
          Submit
        </Tombol>
        <RangePicker onChange={onHandleDateRange} style={{ marginLeft: 8 }} />
        <Tombol
          onClick={ondateRangeSubmit}
          type="primary"
          style={{ marginLeft: 8 }}
        >
          Submit
        </Tombol>
        <Tombol
          onClick={onButtonReset}
          type="primary"
          style={{ marginLeft: 8 }}
        >
          Reset
        </Tombol>
      </div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(dataTransaction) => dataTransaction.id}
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
      {/* </Page> */}
      <ChakraProvider>
        {/* APPROVE */}
        <AlertDialog isOpen={confirmApprove}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Approve Confirmation
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to approve this transaction?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={onBtnCancelConfirmApprove}>Cancel</Button>
                <Button
                  onClick={handleApprove}
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

        {/* REJECT */}

        <AlertDialog isOpen={confirmReject}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Reject Confirmation
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to reject this transaction?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={onBtnCancelConfirmReject}>Cancel</Button>
                <Button
                  onClick={handleReject}
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
    </ThemeProvider>
  );
};

export default AdminTransaction;
