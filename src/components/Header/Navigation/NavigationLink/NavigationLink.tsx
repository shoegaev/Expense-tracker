import React from "react";
import {NavLink} from "react-router-dom";
import classes from "./NavigationLinkStyle.module.scss";

export interface NavigationLinkProps {
  cssClasses?: string[];
  to: string;
  children: string;
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const NavigationLink = ({
  onClick,
  cssClasses,
  to,
  children: text,
}: NavigationLinkProps) => {
  return (
    <NavLink
      onClick={e => {
        if (onClick) onClick(e);
      }}
      to={to}
      className={({isActive}) => {
        const classNameArr = [
          classes.NavigationLink,
          isActive ? classes.NavigationLink_active : "",
          ...(cssClasses ?? []),
        ];
        return classNameArr.join(" ");
      }}>
      <div className={classes.NavigationLink__content}>
        <span>{text}</span>
      </div>
    </NavLink>
  );
};

export default NavigationLink;
