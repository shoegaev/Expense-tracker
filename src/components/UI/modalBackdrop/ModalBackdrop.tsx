import React from "react";
import cl from "./ModalBackdropStyle.module.scss";
import {ControlParams} from "../../../types/ControlParamsType";

interface ModalBackdropProps {
  cssClasses?: string[];
  isVisibleControlParams: ControlParams<boolean>;
  closeOnClick?: boolean;
}

const ModalBackdrop = ({
  cssClasses,
  isVisibleControlParams,
  closeOnClick = true,
}: ModalBackdropProps) => {
  const [isVisible, setIsVisible] = isVisibleControlParams;
  const classesArr = [
    cl.ModalBackdrop,
    isVisible ? cl.ModalBackdrop_visible : "",
    ...(cssClasses ?? []),
  ];
  return (
    <div
      onClick={() => {
        if (isVisible && closeOnClick) setIsVisible(false);
      }}
      className={classesArr.join(" ")}></div>
  );
};

export default ModalBackdrop;
