import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
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
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { io } from "socket.io-client";

const socket = io.connect("http://localhost:2000");

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
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const joinRoom = (channel) => {
    console.log("Joining channel ", channel);
    socket.emit("join_channel", channel);
  };

  const sendNotification = (message, channel) => {
    console.log("Send notif");
    socket.emit("send_notification", { message, channel });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onButtonReset = () => {
    Axios.get(API_URL + `/admin/transaction`)
      .then((respond) => {
        // save user data to global state
        // dispatch({ type: "DATA_TRANSACTIONS", payload: respond.data });

        console.log(respond.data);
        setDataTransaction(respond.data);
        console.log("data:", respond.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle Approve
  const handleApprove = (id, user_id, code) => {
    console.log("id:", id);
    // const test = "Approved";
    // console.log()
    setStatus("Approved");
    // console.log(await getStatus())

    // solusi update state click pertama
    setStatus((statusbaru) => {
      console.log("test:", statusbaru);
      const newStatus = {
        id: id,
        status: statusbaru,
        month: month,
        startDate: startDate,
        endDate: endDate,
        userId: user_id,
        message: `Your purchase with code ${code} has been approved`,
        invoiceHeaderId: id,
        invoiceHeaderCode: code,
      };
      Axios.patch(API_URL + `/admin/changetransactionstatus`, newStatus)
        .then((respond) => {
          // save user data to global state
          // dispatch({ type: "STATUS", payload: respond.data });

          console.log(respond.data);
          setDataTransaction(respond.data);
          // console.log("data:", respond.data);
          joinRoom(String(user_id));
          sendNotification(
            `Your purchase ${code} has been approved`,
            String(user_id)
          );
        })
        .catch((error) => {
          console.log(error);
        });
      setOpen(false);

      return status;
    });
  };
  // Handle reject
  const handleReject = (id, user_id, code) => {
    console.log("id:", id);
    // const test = ;
    // console.log()
    setStatus("Rejected");
    // console.log(await getStatus())
    setStatus((statusbaru) => {
      console.log("test:", statusbaru);
      const newStatus = {
        id: id,
        status: statusbaru,
        month: month,
        startDate: startDate,
        endDate: endDate,
        userId: user_id,
        message: `Your purchase with code ${code} has been rejected`,
        invoiceHeaderId: id,
        invoiceHeaderCode: code,
      };
      Axios.patch(API_URL + `/admin/changetransactionstatus`, newStatus)
        .then((respond) => {
          // save user data to global state
          // dispatch({ type: "STATUS", payload: respond.data });

          console.log(respond.data);
          setDataTransaction(respond.data);
          // console.log("data:", respond.data);
          joinRoom(String(user_id));
          sendNotification(
            `Your purchase ${code} has been rejected`,
            String(user_id)
          );
        })
        .catch((error) => {
          console.log(error);
        });

      return status;
    });
  };

  console.log(dataTransaction);

  const columns = [
    {
      field: "code",
      identity: true,
      headerName: "Invoice Code",
      width: 90,
      headerAlign: "center",
    },
    {
      field: "username",
      headerName: "Customer Name",
      width: 200,
      editable: false,
      headerAlign: "center",
    },

    {
      field: "status",
      headerName: "Status",
      width: 200,
      editable: false,
      headerAlign: "center",
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
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box>
            Rp {parseInt(params.row.total_payment).toLocaleString("id-ID")}
          </Box>
        );
      },
    },
    {
      field: "expired_date",
      headerName: "Expired Date",
      width: 150,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "created_at",
      headerName: "Payment Date",
      width: 200,
      editable: false,
      headerAlign: "center",
      type: "dateTime",
      renderCell: (params) => {
        return <Box>{params.row.created_at ? params.row.created_at : "-"}</Box>;
      },
    },
    {
      field: "picture",
      headerName: "Payment Proof",
      width: 120,
      editable: false,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <>
            {params.row.created_at ? (
              <Link to={"/admin/transaction/" + params.row.id}>
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
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="action">
            {params.row.created_at ? (
              <IconButton
                onClick={() =>
                  handleApprove(
                    params.row.id,
                    params.row.user_id,
                    params.row.code
                  )
                }
              >
                {/* <IconButton onClick={() => handleClickOpen(params.row.id)}> */}
                <CheckCircleSharpIcon style={{ color: "green" }} />
              </IconButton>
            ) : (
              <IconButton>
                <CheckCircleSharpIcon style={{ color: "grey" }} />
              </IconButton>
            )}

            {/* <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Let Google help apps determine location. This means sending
                  anonymous location data to Google, even when no apps are
                  running.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={() => handleApprove(params.row.id)} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog> */}
            <IconButton
              onClick={() =>
                handleReject(params.row.id, params.row.user_id, params.row.code)
              }
            >
              <CancelSharpIcon style={{ color: "red" }} />
            </IconButton>
          </div>
        );
      },
    },
  ];
  // () => handleDelete(params.row.id)

  useEffect(() => {
    Axios.get(API_URL + `/admin/transaction`)
      .then((respond) => {
        // console.log(respond.data);
        // console.log("data:", respond.data);

        // save user data to global state
        dispatch({ type: "DATA_TRANSACTIONS", payload: respond.data });

        setDataTransaction(respond.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const data = selector((state) => state.transactionsReducer);
  // console.log("data globalku:", data);
  // setDataTransaction(data)

  return (
    <>
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
          rows={dataTransaction}
          columns={columns}
          autoHeight={true}
          pageSize={5}
          rowsPerPageOptions={[10]}
          // checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </>
  );
};

export default AdminTransaction;
