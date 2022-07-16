import React, { useState, useEffect } from "react";
import Axios from "axios";
import ThemeProvider from "../../theme";
import moment from "moment";
// import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
// components
import Page from "../../components/admin/Page";
import Date from "../../components/admin/Date";
// import Iconify from "../../components/admin/iconify";
// sections
import AppWidgetSummary from "../../components/admin/AppWidgetSummary";

// ----------------------------------------------------------------------

import { DatePicker, Select, Space, TimePicker } from "antd";
// import React, { useState } from 'react';
const { Option } = Select;

export default function AdminReports() {
  const API_URL = process.env.REACT_APP_URL_API;
  // const theme = useTheme();
  const [type, setType] = useState("date");
  const [revenue, setRevenue] = useState(null);
  const [cost, setCost] = useState(null);
  const [profit, setProfit] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [numberOfSales, setNumberOfSales] = useState(null);
  const [dataTopThree, setDataTopThree] = useState([]);

  const columns = [
    {
      field: "id",
      identity: true,
      headerName: "ID",
      width: 90,
      // headerAlign: "center",
    },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      editable: false,
      // headerAlign: "center",
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      editable: false,
      // headerAlign: "center",
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 150,
      editable: false,
      // headerAlign: "center",
    },
    {
      field: "price",
      headerName: "Price",
      width: 200,
      editable: false,
      valueFormatter: (params) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(params?.value),
      // headerAlign: "center",
      // type: "dateTime",
    },
    {
      field: "sold",
      headerName: "Sold",
      width: 150,
      editable: false,
      // headerAlign: "center",
      // type: "dateTime",
    },
  ];

  const PickerWithType = ({ type, onChange }) => {
    const handleDatePicked = (date, dateString) => {
      console.log(dateString);
      Axios.post(API_URL + `/admin/getreportbydate`, { date: dateString })
        .then((respond) => {
          // console.log(respond.data)
          console.log("RESPON:", respond.data);
          setRevenue(respond.data.revenue);
          setCost(respond.data.cost);
          setProfit(respond.data.profit);
          setNumberOfSales(respond.data.number_of_sales);
          setCurrentMonth(respond.data.date);
          setDataTopThree(respond.data.top_three);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const handleMonthPicked = (month, monthString) => {
      // console.log( dateString);
      Axios.post(API_URL + `/admin/getreportbymonth`, { month: monthString })
        .then((respond) => {
          // console.log(respond.data)
          console.log("RESPON:", respond.data);
          setRevenue(respond.data.revenue);
          setCost(respond.data.cost);
          setProfit(respond.data.profit);
          setNumberOfSales(respond.data.number_of_sales);
          setCurrentMonth(respond.data.month);
          setDataTopThree(respond.data.top_three);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const handleYearPicked = (year, yearString) => {
      Axios.post(API_URL + `/admin/getreportbyyear`, { year: yearString })
        .then((respond) => {
          // console.log(respond.data)
          console.log("RESPON:", respond.data);
          setRevenue(respond.data.revenue);
          setCost(respond.data.cost);
          setProfit(respond.data.profit);
          setNumberOfSales(respond.data.number_of_sales);
          setCurrentMonth(respond.data.year);
          setDataTopThree(respond.data.top_three);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // const monthPicked = (month,monthString) => {
    //   alert(monthString)
    // }

    // const bulan = console.log('bulan dipilih')
    // console.log(onChange)
    // if (type === "time") return <TimePicker onChange={onChange} />;
    if (type === "date") return <DatePicker onChange={handleDatePicked} />;
    if (type === "month")
      return <DatePicker onChange={handleMonthPicked} picker="month" />;
    if (type === "year")
      return <DatePicker onChange={handleYearPicked} picker="year" />;
    return <DatePicker picker={type} onChange={onChange} />;
  };

  // REPORT CURRENT MONTH
  useEffect(() => {
    Axios.get(API_URL + `/admin/report`)
      .then((respond) => {
        console.log("RESPON:", respond.data);
        setRevenue(respond.data.revenue);
        setCost(respond.data.cost);
        setProfit(respond.data.profit);
        setNumberOfSales(respond.data.number_of_sales);
        setCurrentMonth(respond.data.current_month);
        setDataTopThree(respond.data.top_three);

        // dispatch({ type: "DATA_TRANSACTIONS", payload: respond.data });

        // setDataTransaction(respond.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ThemeProvider>
      <Page title="Reports">
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            {/* <Button >Submit</Button> */}
            <Space>
              <Select value={type} onChange={setType}>
                {/* <Option value="time">Time</Option> */}
                <Option value="date">Date</Option>
                {/* <Option value="week">Week</Option> */}
                <Option value="month">Month</Option>
                {/* <Option value="quarter">Quarter</Option> */}
                <Option value="year">Year</Option>
              </Select>
              {/* <PickerWithType type={type} onChange={(value) => console.log(value)} /> */}
              <PickerWithType
                type={type}
                // onChange={}
              />
            </Space>
          </Typography>
          <div className="title">
            <Typography variant="h4" sx={{ mb: 5 }}>
              {/* Report  { moment(currentMonth).format("LLLL")} */}
              Reports {currentMonth}
            </Typography>
          </div>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Revenue"
                total={revenue}
                icon={"fa6-solid:hand-holding-dollar"}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Profit"
                total={profit}
                color="info"
                icon={"icons8:banknotes"}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Number of sales"
                total={numberOfSales}
                color="warning"
                icon={"mdi:cart"}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Costs"
                total={cost}
                color="error"
                icon={"eos-icons:rotating-gear"}
              />
            </Grid>
          </Grid>
          <Box marginTop={"50px"} sx={{ height: 400, width: "100%" }}>
          <div className="title">
              <Typography variant="h4" sx={{ mb: 5 }}>
                Belum Fix
              </Typography>
            </div>
            <DataGrid
              getRowId={(dataTransaction) => dataTransaction.id}
              rows={[]}
              columns={columns}
              autoHeight={true}
              pageSize={5}
              rowsPerPageOptions={[10]}
              // checkboxSelection
              disableSelectionOnClick
            />
          </Box>
          <Box  sx={{ height: 400, width: "100%" }}>
            <div className="title">
              <Typography variant="h4" sx={{ mb: 5 }}>
                Top 3 Most Sold
              </Typography>
            </div>

            <DataGrid
              getRowId={(dataTransaction) => dataTransaction.id}
              rows={dataTopThree}
              columns={columns}
              autoHeight={true}
              pageSize={5}
              rowsPerPageOptions={[10]}
              // checkboxSelection
              disableSelectionOnClick
            />
          </Box>
        </Container>
      </Page>
    </ThemeProvider>
  );
}
