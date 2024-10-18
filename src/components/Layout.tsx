import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import classes from "./LayoutStyle.module.scss";

const Layout = () => {

  return (
    <>
      <header>
        <nav>
          <NavLink to="/history">History</NavLink>
          <NavLink to="/category">Categories</NavLink>
          <NavLink to="diagram">Diagram</NavLink>
        </nav>
      </header>
      <main className={classes.contentForm}>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default Layout;
