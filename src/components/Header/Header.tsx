import React from "react";
import {ControlParams} from "../../types/ControlParamsType";
import classes from "./HeaderStyle.module.scss";
import Toolbar from "./Toolbar/Toolbar";
import Navigation from "./Navigation/Navigation";

interface HeaderProps {
  isOpenControlParams: ControlParams<boolean>;
}

const Header = ({isOpenControlParams}: HeaderProps) => {
  const [isOpen, setIsOpen] = isOpenControlParams;
  return (
    <header
      className={[classes.Header, isOpen ? classes.Header_open : ""].join(" ")}>
      <Navigation
        NavigationLinkOnClick={() => {
          if (isOpen) setIsOpen(false);
        }}
      />
      <Toolbar />
    </header>
  );
};

export default Header;
