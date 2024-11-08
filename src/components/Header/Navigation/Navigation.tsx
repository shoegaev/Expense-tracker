import React from "react";
import classes from "./NavigationStyle.module.scss"
import NavigationLink from "./NavigationLink/NavigationLink";


const Navigation = () => {
  return (
    <nav className={classes.Navigation}>
      <NavigationLink to="/history">History</NavigationLink>
      <NavigationLink to="/category">Categories</NavigationLink>
      <NavigationLink to="/diagram">Diagram</NavigationLink>
    </nav>
  );
};

export default Navigation;
