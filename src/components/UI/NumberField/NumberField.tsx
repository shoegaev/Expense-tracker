import React, {useRef} from "react";
import TextField, {TextFieldProps} from "../TextField/TextField";
import classes from "./NumberFieldStyle.module.scss";

interface NumberFieldProps extends TextFieldProps {
  id?: string;
}

// eslint-disable-next-line max-lines-per-function
const NumberField = (props: NumberFieldProps) => {
  const [value, setValue] = props.controlParams;
  const isError = Boolean(props?.validation?.validationState.errMessage);
  const startRepeatingIdRef = useRef<null | NodeJS.Timeout>(null);
  const repeatingIdRef = useRef<null | NodeJS.Timeout>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const synthInputEventRef = useRef(new Event("input", {bubbles: true}));

  const isValueValidForButton = (
    type: "plus" | "minus",
    value: string,
  ): boolean => {
    if (isError) {
      return false;
    }
    if (type === "minus" && (value === "" || value.match(/^0\.{0,1}0{0,}$/))) {
      return false;
    }

    return true;
  };
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
    // console.log(textAreaRef.current);
    // console.log(synthInputEventRef.current);

    textAreaRef.current?.dispatchEvent(synthInputEventRef.current);
    setValue(v => {
      if (!isValueValidForButton("minus", v)) {
        clearTimers();
        return v;
      }
      if (Number(v) - 0.1 < 0) {
        return "0";
      }
      return (Number(v) - 0.1).toFixed(2);
    });
  };
  const plusButtonOnClick = () => {
    setValue(v => {
      textAreaRef.current?.dispatchEvent(synthInputEventRef.current);
      if (!isValueValidForButton("plus", v)) {
        clearTimers();
        return v;
      }
      return (Number(v) + 0.1).toFixed(2);
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
    <div className={classes.NumberField}>
      <TextField
        {...props}
        inputMode="decimal"
        symbolsRestrictions={/[0-9.]/}
        paddingRight={90}
        textAreaRef={textAreaRef}
      />
      <div className={classes.NumberField__buttons}>
        <div
          className={[
            classes.NumberField__minusButton,
            isValueValidForButton("minus", value)
              ? ""
              : classes.NumberField__button_inactive,
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
            classes.NumberField__plusButton,
            isValueValidForButton("plus", value)
              ? ""
              : classes.NumberField__button_inactive,
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
    </div>
  );
};

export default NumberField;
