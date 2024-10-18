import React from "react";
import classes from "./MainButtonStyle.module.scss";

type MainButtonProps = {
  text: string;
  callback: () => void;
};

const MainButton = ({text, callback}: MainButtonProps) => {
  return (
    <div onClick={callback} className={classes.MainButton}>
      <span className={classes.MainButton_text}>{text}</span>
    </div>
  );
};

export default MainButton;
