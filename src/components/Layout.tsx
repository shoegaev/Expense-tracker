import React from "react";
import {Outlet} from "react-router-dom";
import classes from "./LayoutStyle.module.scss";
import Header from "./Header/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className={classes.content}>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default Layout;
