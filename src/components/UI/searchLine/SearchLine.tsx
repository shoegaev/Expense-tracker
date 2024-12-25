import React from "react";
import TextField from "../TextField/TextField";
import {ControlParams} from "../../../types/ControlParamsType";
import {ReactComponent as MagnifierIcon} from "../../../assets/icons/MagnifierIcon.svg";
import {ReactComponent as CrossIcon} from "../../../assets/icons/CrossIcon.svg";

import cl from "./SearchLine.module.scss";

interface SearchLineProps {
  cssClasses?: string[];
  controllParams: ControlParams<string>;
  disabled?: boolean;
}

const SearchLine = ({
  cssClasses,
  controllParams,
  disabled,
  ...props
}: SearchLineProps) => {
  const [, setValue] = controllParams;
  return (
    <TextField
      cssClasses={[
        cl.SearchLine,
        disabled ? cl.SearchLine_disabled : "",
        ...(cssClasses ?? []),
      ]}
      controlParams={controllParams}
      innerElements={{
        left: [
          <MagnifierIcon
            className={cl.SearchLine__magnifierIcon}
            key="MagnifierIcon"
          />,
        ],
        right: [
          <div className={cl.SearchLine__button} key="button">
            <CrossIcon
              onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
                if (disabled) {
                  return;
                }
                e.preventDefault();
                setValue("");
              }}
            />
          </div>,
        ],
      }}
      disabled={disabled}
      {...props}
    />
  );
};

export default SearchLine;
