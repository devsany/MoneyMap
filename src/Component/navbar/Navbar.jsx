import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <NavLink to="/">Transaction Form</NavLink>
      <NavLink to="/transaction_table">Transaction Table</NavLink>
    </div>
  );
};

export default Navbar;
