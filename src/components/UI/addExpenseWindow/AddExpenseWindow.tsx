import React, {useEffect, useState} from "react";
import {Expense} from "../../../types/appDataType";
import TextField from "../TextField/TextField";
import cl from "./AddExpenseWindowStyle.module.scss";
import MainButton from "../MainButton/MainButton";

export interface AddExpenseWindowState extends Expense {
  isDataValid: boolean;
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

// eslint-disable-next-line max-lines-per-function
const AddExpenseWindow = ({
  className,
  AddExpenseWindowState: state,
  addExpense,
  setAddExpenseWindowState: setState,
}: AddExpenseWindowProps) => {
  const [validationState, setValidationState] = useState<ValidationState>({
    name: {isValid: false, errMessage: null},
    categoryName: {isValid: true, errMessage: null}, //временно захардкожено//
    amount: {isValid: false, errMessage: null},
    date: {isValid: true, errMessage: null}, //временно захардкожено//
    descriprion: {isValid: false, errMessage: null},
  });
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
  return (
    <div className={`${cl.AddExpenseWindow} ${className}`}>
      <h2>Creating a new Expense</h2>
      <div>&lt;- Back</div>
      <TextField
        controlParams={[
          state.name,
          newValue => {
            setStateByKey("name", newValue);
          },
        ]}
        placeholder="Name"
        labelText="Name"
        labelTextPosition="left"
        validation={{
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
        labelText="Category"
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
        labelText="Amount"
        labelTextPosition="left"
        validation={{
          validationState: validationState.amount,
          setValidationState: state => {
            setValidationStateByKey("amount", state);
          },
          validations: [
            {
              message: "Invalid value",
              callbak: value => {
                if (value.match(/^\d{1,}$/) || value.match(/^\d{1,}\.\d$/)) {
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
        labelText="Date"
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
        labelText="Describtion"
        labelTextPosition="left"
        validation={{
          validationState: validationState.descriprion,
          setValidationState: state => {
            setValidationStateByKey("descriprion", state);
          },
          validations: [
            {
              message: "Maximum length is exceed",
              callbak: value => value.length <= 250,
            },
          ],
        }}
      />
      <MainButton
        text="Add expense"
        callback={() => {
          addExpense({...state, date: Date.now()});
        }}
        isDisabled={!state.isDataValid}
      />
    </div>
  );
};

export default AddExpenseWindow;
