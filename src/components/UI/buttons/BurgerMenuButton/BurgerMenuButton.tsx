import React from "react";
import cl from "./BurgerMenuButtonStyle.module.scss";
import {ControlParams} from "../../../../types/ControlParamsType";

interface BurgerMenuButtonProps {
  controlParams: ControlParams<boolean>;
  cssClasses?: string[];
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const BurgerMenuButton = ({
  controlParams,
  cssClasses,
  onClick,
}: BurgerMenuButtonProps) => {
  const [isActive, setIsActive] = controlParams;
  const className = [
    cl.BurgerMenuButton,
    isActive ? cl.BurgerMenuButton_active : "",
    ...(cssClasses ?? []),
  ].join(" ");
  return (
    <button
      className={className}
      onClick={e => {
        if (onClick) onClick(e);
        setIsActive(prev => !prev);
      }}>
      <div className={cl.BurgerMenuButton__stick}></div>
      <div className={cl.BurgerMenuButton__stick}> </div>
      <div className={cl.BurgerMenuButton__stick}> </div>

    </button>
  );
};

export default BurgerMenuButton;
