import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./index.css";
import { useParams } from "react-router-dom";
import { URL_API } from "../../helpers";
import api from "../../services/api";

export default function TransactionProof() {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const onButtonBack = () => {
    navigate("/admin/transaction");
  };

  const invoiceId = useParams().id;

  useEffect(() => {
    let fetch = `/admin/transaction/${invoiceId}`;

    api
      .get(fetch)
      .then((res) => {
        setUrl(() => res.data);
      })
      .catch((err) => {
        // console.log("error");
        console.log(err);
      });
  }, []);

  console.log(url);

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
          <img className="userUpdateImg" src={`${URL_API}/${url}`} alt="none" />
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
