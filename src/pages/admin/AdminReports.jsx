import React, { useState, useEffect } from "react";
import Axios from "axios";
import ThemeProvider from "../../theme";
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
// components
import Page from "../../components/admin/Page";
import Iconify from "../../components/admin/iconify";
// sections
import AppWidgetSummary from "../../components/admin/AppWidgetSummary";

// ----------------------------------------------------------------------

export default function AdminReports() {
  const API_URL = process.env.REACT_APP_URL_API;
  // const theme = useTheme();
  const [revenue, setRevenue] = useState(null);
  const [cost, setCost] = useState(null);
  const [profit, setProfit] = useState(null);
  const [numberOfSales, setNumberOfSales] = useState(null);
  const [data, setData] = useState([]);

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

  useEffect(() => {
    Axios.get(API_URL + `/admin/report`)
      .then((respond) => {
        console.log(respond.data.revenue);
        setRevenue(respond.data.revenue);
        setCost(respond.data.cost);
        setProfit(respond.data.profit);
        setNumberOfSales(respond.data.numberOfSales);

        // dispatch({ type: "DATA_TRANSACTIONS", payload: respond.data });

        // setDataTransaction(respond.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get(API_URL + `/admin/top3`)
      .then((respond) => {
        setData(respond.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ThemeProvider>
      <Page title="Reports">
        <Container maxWidth="xl">
          {/* <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Addumairi
        </Typography> */}

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
                Top 3 Most Sold
              </Typography>
            </div>

            <DataGrid
              getRowId={(dataTransaction) => dataTransaction.id}
              rows={data}
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
