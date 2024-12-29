import React from "react";
import classes from "./NavigationStyle.module.scss";
import NavigationLink from "./NavigationLink/NavigationLink";

interface NavigationsProps {
  NavigationLinkOnClick?: (
    e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => void;
}

const Navigation = ({NavigationLinkOnClick}: NavigationsProps) => {
  const NavLinkProps = {
    cssClasses: [classes.Navigation_link],
    onClick: NavigationLinkOnClick,
  };

  return (
    <nav className={classes.Navigation}>
      <NavigationLink {...NavLinkProps} to="/history">
        History
      </NavigationLink>
      <NavigationLink {...NavLinkProps} to="/category">
        Categories
      </NavigationLink>
      <NavigationLink {...NavLinkProps} to="/diagram">
        Diagram
      </NavigationLink>
    </nav>
  );
};

export default Navigation;
