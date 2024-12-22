import React, {useEffect, useState} from "react";
import {Expense} from "../../types/appDataType";
import FormTextField from "../UI/FormTextField/FormTextField";
import classes from "./AddExpenseWindowStyle.module.scss";
import MainButton from "../UI/MainButton/MainButton";
import StepperButtons from "../UI/StepperButtons/StepperButtons";
import {ReactComponent as ArrowIcon} from "../../assets/icons/Arrow.svg";

export interface AddExpenseWindowState extends Expense {
  isDataValid: boolean;
  isOpen: boolean;
}

export interface AddExpenseWindowProps {
  className?: string;
  addExpense: (params: Expense) => true | "Invalid Date" | "Invalid category";
  AddExpenseWindowState: AddExpenseWindowState;
  setAddExpenseWindowState: React.Dispatch<
    React.SetStateAction<AddExpenseWindowState>
  >;
}

type ValidationState = {
  [name in keyof Expense]: {isValid: boolean; errMessage: string | null};
};

export const defaulValidationState: ValidationState = {
  name: {isValid: false, errMessage: null},
  categoryName: {isValid: true, errMessage: null}, //временно захардкожено//
  amount: {isValid: false, errMessage: null},
  date: {isValid: true, errMessage: null}, //временно захардкожено//
  descriprion: {isValid: true, errMessage: null},
};

export const defaulAddExpenseWindowState: AddExpenseWindowState = {
  name: "",
  categoryName: "food",
  amount: "",
  date: "",
  descriprion: "",
  isDataValid: false,
  isOpen: false,
};

// eslint-disable-next-line max-lines-per-function
const AddExpenseWindow = ({
  className,
  AddExpenseWindowState: state,
  addExpense,
  setAddExpenseWindowState: setState,
}: AddExpenseWindowProps) => {
  const [validationState, setValidationState] = useState<ValidationState>(
    defaulValidationState,
  );

  const setStateByKey = <T extends keyof AddExpenseWindowState>(
    statePropKey: T,
    value:
      | AddExpenseWindowState[T]
      | ((prevValue: AddExpenseWindowState[T]) => AddExpenseWindowState[T]),
  ): void => {
    if (typeof value === "function") {
      setState(s => {
        return {...s, [statePropKey]: value(s[statePropKey])};
      });
    } else {
      setState({
        ...state,
        [statePropKey]: value,
      });
    }
  };

  const setValidationStateByKey = (
    key: keyof ValidationState,
    value: {isValid: boolean; errMessage: null | string},
  ): void => {
    setValidationState({...validationState, [key]: value});
  };

  useEffect(() => {
    let isDataValid = true;
    for (const value of Object.values(validationState)) {
      if (!value.isValid) {
        isDataValid = false;
        break;
      }
    }
    setStateByKey("isDataValid", isDataValid);
  }, [validationState]);

  function closeAndClearWindow(): void {
    setState(defaulAddExpenseWindowState);
    setValidationState(defaulValidationState);
  }
  return (
    <div className={`${classes.AddExpenseWindow} ${className ?? ""}`}>
      <h2 className={classes.AddExpenseWindow__heading}>
        Creating a new Expense
      </h2>
      <div
        className={classes.AddExpenseWindow__backButton}
        onClick={closeAndClearWindow}>
        <ArrowIcon className={classes.AddExpenseWindow__backButtonIcon} />
      </div>
      <div className={classes.AddExpenseWindow__fields}>
        <FormTextField
          cssClasses={[classes.AddExpenseWindow__field]}
          controlParams={[
            state.name,
            newValue => {
              setStateByKey("name", newValue);
            },
          ]}
          placeholder="Expense name"
          labelText="Name:"
          validation={{
            isRequired: true,
            validationState: validationState.name,
            setValidationState: state => {
              setValidationStateByKey("name", state);
            },
            validations: [
              {
                message: "Maximum length is exceed",
                callbak: value => value.length <= 25,
              },
            ],
          }}
        />
        <FormTextField
          cssClasses={[classes.AddExpenseWindow__field]}
          controlParams={[
            state.categoryName,
            newValue => {
              setStateByKey("categoryName", newValue);
            },
          ]}
          placeholder="Category"
          labelText="Category:"
          disabled={true}
        />
        <FormTextField
          cssClasses={[classes.AddExpenseWindow__field]}
          controlParams={[
            state.amount,
            newValue => {
              setStateByKey("amount", newValue);
            },
          ]}
          placeholder="Amount"
          labelText="Amount:"
          symbolsRestrictions={/[0-9.]/}
          innerElements={{
            right: [
              <StepperButtons
                key="button"
                controlParams={[
                  state.amount,
                  newValue => {
                    setStateByKey("amount", newValue);
                  },
                ]}
              />,
            ],
          }}
          validation={{
            isRequired: true,
            validationState: validationState.amount,
            setValidationState: state => {
              setValidationStateByKey("amount", state);
            },
            validations: [
              {
                message: "Invalid symbols",
                callbak: value => !value.match(/[a-zA-Z]/),
              },
              {
                message: "Maximum length is exceed",
                callbak: value => value.length <= 12,
              },
              {
                message: "Invalid decimal fraction",
                callbak: value => {
                  const valueTrimed = value.trim();
                  const arr = valueTrimed.split(".");
                  if (
                    arr.length > 2 ||
                    (arr.length === 2 && arr[0].length === 0)
                  ) {
                    return false;
                  }
                  return true;
                },
              },
              {
                message: "Two decimal places max",
                callbak: value => {
                  const valueTrimed = value.trim();
                  const arr = valueTrimed.split(".");
                  if (arr.length === 1) {
                    return true;
                  } else {
                    if (arr[1].length > 2) {
                      return false;
                    }
                    return true;
                  }
                },
              },
              {
                callbak: value => {
                  return !value.match(/^0\.{0,1}0{0,}$/);
                },
              },
            ],
          }}
        />
        <FormTextField
          cssClasses={[classes.AddExpenseWindow__field]}
          controlParams={[
            state.categoryName,
            newValue => {
              setStateByKey("date", newValue);
            },
          ]}
          placeholder="Date"
          labelText="Date:"
          disabled={true}
        />
        <FormTextField
          cssClasses={[classes.AddExpenseWindow__field_multiLine]}
          controlParams={[
            state.descriprion,
            newValue => {
              setStateByKey("descriprion", newValue);
            },
          ]}
          placeholder="Describtion"
          labelText="Describtion:"
          lineType="multi-line"
          validation={{
            isRequired: false,
            validationState: validationState.descriprion,
            setValidationState: state => {
              setValidationStateByKey("descriprion", state);
            },
            validations: [
              {
                message: "Maximum length is exceed",
                callbak: value => value.length <= 1000,
              },
            ],
          }}
        />
      </div>
      <span
        className={[
          classes.AddExpenseWindow__warningText,
          state.isDataValid
            ? classes.AddExpenseWindow__warningText_transparent
            : "",
        ].join(" ")}>
        Fill in all required* forms with no errors
      </span>
      <MainButton
        className={classes.AddExpenseWindow__submitButton}
        text="Add"
        callback={() => {
          addExpense({...state, date: Date.now().toString()});
          closeAndClearWindow();
        }}
        isDisabled={!state.isDataValid}
      />
    </div>
  );
};

export default AddExpenseWindow;
