import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { UserProvider } from "./UserContext";

const MainNavigation = () => {
  return (
    <>
      <UserProvider>
        <Navbar />
        <Outlet />
      </UserProvider>
    </>
  );
};

export default MainNavigation;
