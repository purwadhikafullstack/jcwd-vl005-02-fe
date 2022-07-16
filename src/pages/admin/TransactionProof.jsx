import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Axios from "axios";
import ThemeProvider from "../../theme";
// import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button as Tombol, DatePicker, version, Typography } from "antd";
import "./report&transactions.css";
const { Title } = Typography;

export default function TransactionProof() {
  const API_URL = process.env.REACT_APP_URL_API;
  const [bukti, setBukti] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("my parameter:", params.invoiceId);
    Axios.get(API_URL + `/admin/transaction/${params.invoiceId}`)
      .then((respond) => {
        console.log("bukti pembayaran:", respond.data);
        setBukti(respond.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onButtonBack = () => {
    navigate("/admin/transactions");
  };
  return (
    <ThemeProvider>
      <div className="user">
        <div className="userTitleContainer">
          {/* <h1 className="UserTitle">Bukti Pembayaran</h1> */}
          <Title level={3}>Payment Proof</Title>
        </div>
        <div className="userContainer">
          <div className="userUpdate">
            <img
              className="userUpdateImg"
              src={API_URL + `${bukti}`}
              alt="none"
            />
          </div>
        </div>
        <div className="back">
          <button onClick={onButtonBack} className="backButton">
            Back
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
}
