import React from "react";
import {NavLink} from "react-router-dom";
import classes from "./NavigationLinkStyle.module.scss";

interface NavigationLinkProps {
  to: string;
  children: string;
}

const NavigationLink = ({to, children: text}: NavigationLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({isActive}) =>
        `${classes.NavigationLink} ${isActive ? classes.NavigationLink_active : ""}`
      }>
      <div className={classes.NavigationLink__content}>
        <span>{text}</span>
      </div>
    </NavLink>
  );
};

export default NavigationLink;
