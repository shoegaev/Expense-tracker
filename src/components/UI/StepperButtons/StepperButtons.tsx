/* eslint-disable max-lines-per-function */
import React, {useRef} from "react";
import {ControlParams} from "../../../types/ControlParamsType";
import cl from "./StepperButtonsStyle.module.scss";

interface StepperButtonsProps {
  controlParams: ControlParams<string>;
  decimalPlaces?: number;
  step?: number;
  disabled?: {
    minus?: boolean;
    plus?: boolean;
  };
}

const StepperButtons = ({
  controlParams,
  decimalPlaces = 2,
  disabled = {minus: false, plus: false},
  step = 0.1,
}: StepperButtonsProps) => {
  const [, setValue] = controlParams;
  const startRepeatingIdRef = useRef<null | NodeJS.Timeout>(null);
  const repeatingIdRef = useRef<null | NodeJS.Timeout>(null);
  const clearTimers = (): void => {
    if (startRepeatingIdRef.current) {
      clearInterval(startRepeatingIdRef.current);
      startRepeatingIdRef.current = null;
    }
    if (repeatingIdRef.current) {
      clearInterval(repeatingIdRef.current);
      repeatingIdRef.current = null;
    }
  };
  const minusButtonOnClick = () => {
    setValue(v => {
      if (disabled.minus) {
        clearTimers();
        return v;
      }
      if (Number(v) - step < 0) {
        return "0";
      }
      return (Number(v) - step).toFixed(decimalPlaces);
    });
  };
  const plusButtonOnClick = () => {
    setValue(v => {
      if (disabled.plus) {
        clearTimers();
        return v;
      }
      return (Number(v) + step).toFixed(decimalPlaces);
    });
  };
  const startRepeat = (callback: () => void): void => {
    startRepeatingIdRef.current = setTimeout(() => {
      if (!repeatingIdRef.current) {
        repeatingIdRef.current = setInterval(callback, 50);
      }
    }, 300);
  };
  return (
    <div className={cl.StepperButtons}>
      <div
        className={[
          cl.StepperButtons__button,
          disabled?.minus ? cl.StepperButtons__button_disabled : "",
        ].join(" ")}
        onPointerDown={() => {
          minusButtonOnClick();
          startRepeat(minusButtonOnClick);
        }}
        onPointerUp={clearTimers}
        onPointerLeave={clearTimers}>
        -
      </div>
      <div
        className={[
          cl.StepperButtons__button,
          disabled?.plus ? cl.StepperButtons__button_disabled : "",
        ].join(" ")}
        onPointerDown={() => {
          plusButtonOnClick();
          startRepeat(plusButtonOnClick);
        }}
        onPointerUp={clearTimers}
        onPointerLeave={clearTimers}>
        +
      </div>
    </div>
  );
};

export default StepperButtons;
