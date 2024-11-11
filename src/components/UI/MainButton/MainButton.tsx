import React from "react";
import classes from "./MainButtonStyle.module.scss";

type MainButtonProps = {
  className?: string;
  text: string;
  isDisabled?: boolean;
  callback: () => void;
};

const MainButton = ({
  text,
  callback,
  isDisabled,
  className,
}: MainButtonProps) => {
  return (
    <div
      onClick={() => {
        if (!isDisabled) callback();
      }}
      className={[
        classes.MainButton,
        isDisabled ? classes.MainButton__disabled : "",
        className ?? "",
      ].join(" ")}>
      <span className={classes.MainButton_text}>{text}</span>
    </div>
  );
};

export default MainButton;
