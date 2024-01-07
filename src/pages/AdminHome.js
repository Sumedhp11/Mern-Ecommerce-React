import React from "react";
import Navbar from "../features/navbar/Navbar";

import AdminProductlist from "../features/admin/AdminProductlist";

const AdminHome = () => {
  return (
    <div>
      <Navbar>
        <AdminProductlist />
      </Navbar>
    </div>
  );
};

export default AdminHome;
