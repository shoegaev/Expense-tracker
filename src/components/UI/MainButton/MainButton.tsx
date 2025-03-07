import React from "react";
import classes from "./MainButtonStyle.module.scss";

type MainButtonProps = {
  className?: string;
  color?: "dark" | "white" | "grey";
  hoverType?: "scale" | "color";
  text: string;
  isDisabled?: boolean;
  callback?: () => void;
};

const MainButton = ({
  text,
  color = "dark",
  hoverType = "scale",
  callback,
  isDisabled,
  className,
}: MainButtonProps) => {
  const buttonClassName = [
    classes.MainButton,
    isDisabled ? classes.MainButton__disabled : "",
    color === "dark"
      ? classes.MainButton__colorDark
      : color === "white"
        ? classes.MainButton__colorWhite
        : classes.MainButton__colorGrey,
    hoverType === "scale"
      ? classes.MainButton__hoverScale
      : classes.MainButton__hoverColor,
    className ?? "",
  ].join(" ");
  return (
    <div
      onClick={() => {
        if (!isDisabled && callback) callback();
      }}
      className={buttonClassName}>
      <span className={classes.MainButton_text}>{text}</span>
    </div>
  );
};

export default MainButton;
