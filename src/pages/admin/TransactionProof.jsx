import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./report&transactions.css";

export default function TransactionProof() {
  const navigate = useNavigate();
  const onButtonBack = () => {
    navigate("/admin/transaction");
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="UserTitle">Bukti Pembayaran</h1>
        {/* <Link to="/newUser">
            <button className="userAddButton">Create</button>
          </Link> */}
      </div>
      <div className="userContainer">
        <div className="userUpdate">
          <img
            className="userUpdateImg"
            src="https://a.c-dn.net/c/content/dam/publicsites/igcom/uk/images/content-2-chart-images/payment%20details.png"
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
  );
}
