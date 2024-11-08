import React from "react";
import classes from "./HeaderStyle.module.scss";
import Toolbar from "./Toolbar/Toolbar";
import Navigation from "./Navigation/Navigation";

const Header = () => {
  return (
    <header className={classes.Header}>
      <Navigation />
      <Toolbar />
    </header>
  );
};

export default Header;
