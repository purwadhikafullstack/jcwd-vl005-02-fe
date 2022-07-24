import React from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import UserAddressList from "./UserAddressList";
import UserAddressNew from "./UserAddressNew";
import UserAddressEdit from "./UserAddressEdit";

function UserAddress() {
  return (
    <Routes>
      <Route path="" element={<UserAddressList />} />
      <Route path="/new" element={<UserAddressNew />} />
      <Route path="/edit" element={<UserAddressEdit />} />
    </Routes>
  );
}

export default UserAddress;
