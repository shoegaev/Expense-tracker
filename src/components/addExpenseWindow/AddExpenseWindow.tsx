import React, {useEffect, useState} from "react";
import {Expense} from "../../types/appDataType";
import TextField from "../UI/TextField/TextField";
import classes from "./AddExpenseWindowStyle.module.scss";
import MainButton from "../UI/MainButton/MainButton";
import {ReactComponent as ArrowIcon} from "../../assets/icons/Arrow.svg";

export interface AddExpenseWindowState extends Expense {
  isDataValid: boolean;
  isOpen: boolean;
}

export interface AddExpenseWindowProps {
  className?: string;
  addExpense: (params: Expense) => true | "Invalid Date" | "Invalid category";
  AddExpenseWindowState: AddExpenseWindowState;
  setAddExpenseWindowState: (expense: AddExpenseWindowState) => void;
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
  date: 0,
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

  const setStateByKey = (
    statePropKey: keyof AddExpenseWindowState,
    value: string | number | boolean,
  ): void => {
    setState({
      ...state,
      [statePropKey]: value,
    });
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
        <TextField
          controlParams={[
            state.name,
            newValue => {
              setStateByKey("name", newValue);
            },
          ]}
          placeholder="Name"
          labelText="Name:"
          labelTextPosition="left"
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
        <TextField
          controlParams={[
            state.categoryName,
            newValue => {
              setStateByKey("categoryName", newValue);
            },
          ]}
          placeholder="Category"
          labelText="Category:"
          labelTextPosition="left"
          disabled={true}
        />
        {/* добавить отдельный элемент для инпута цифр*/}
        <TextField
          controlParams={[
            state.amount,
            newValue => {
              setStateByKey("amount", newValue);
            },
          ]}
          placeholder="Amount"
          labelText="Amount:"
          labelTextPosition="left"
          validation={{
            isRequired: true,
            validationState: validationState.amount,
            setValidationState: state => {
              setValidationStateByKey("amount", state);
            },
            validations: [
              {
                message: "Invalid value",
                callbak: value => {
                  const valueTrimed = value.trim();
                  if (
                    valueTrimed.match(/^\d{1,}$/) ||
                    valueTrimed.match(/^\d{1,}\.\d$/)
                  ) {
                    return true;
                  }
                  return false;
                },
              },
            ],
          }}
        />
        <TextField
          controlParams={[
            state.categoryName,
            newValue => {
              setStateByKey("date", newValue);
            },
          ]}
          placeholder="Date"
          labelText="Date:"
          labelTextPosition="left"
          disabled={true}
        />
        <TextField
          controlParams={[
            state.descriprion,
            newValue => {
              setStateByKey("descriprion", newValue);
            },
          ]}
          placeholder="Describtion"
          labelText="Describtion:"
          labelTextPosition="top"
          validation={{
            isRequired: false,
            validationState: validationState.descriprion,
            setValidationState: state => {
              setValidationStateByKey("descriprion", state);
            },
            validations: [
              {
                message: "Maximum length is exceed",
                callbak: value => value.length <= 300,
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
          addExpense({...state, date: Date.now()});
          closeAndClearWindow();
        }}
        isDisabled={!state.isDataValid}
      />
    </div>
  );
};

export default AddExpenseWindow;
