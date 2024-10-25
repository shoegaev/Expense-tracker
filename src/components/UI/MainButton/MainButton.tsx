import React from "react";
import classes from "./MainButtonStyle.module.scss";

type MainButtonProps = {
  text: string;
  isDisabled?: boolean;
  callback: () => void;
};

const MainButton = ({text, callback, isDisabled}: MainButtonProps) => {
  return (
    <div
      onClick={() => {
        if (!isDisabled) callback();
      }}
      className={`${classes.MainButton} ${isDisabled ? classes.MainButton__disabled : ""}`}>
      <span className={classes.MainButton_text}>{text}</span>
    </div>
  );
};

export default MainButton;
