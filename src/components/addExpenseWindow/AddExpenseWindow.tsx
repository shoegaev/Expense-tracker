import React, {useEffect, useState} from "react";
import {Expense} from "../../types/appDataType";
import FormTextField from "../UI/FormTextField/FormTextField";
import AmountField from "./fields/AmountField/AmountField";
import NameField from "./fields/NameField/NameField";
import classes from "./AddExpenseWindowStyle.module.scss";
import MainButton from "../UI/MainButton/MainButton";
import {ReactComponent as ArrowIcon} from "../../assets/icons/Arrow.svg";
import DescribtionField from "./fields/DescribtionField/DescribtionField";

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
        <NameField
          cssClasses={[classes.AddExpenseWindow__field]}
          controlParams={[
            state.name,
            newValue => {
              setStateByKey("name", newValue);
            },
          ]}
          validation={{
            validationState: validationState.name,
            setValidationState: state => {
              setValidationStateByKey("name", state);
            },
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
        <AmountField
          cssClasses={[classes.AddExpenseWindow__field]}
          controlParams={[
            state.amount,
            newValue => {
              setStateByKey("amount", newValue);
            },
          ]}
          validation={{
            validationState: validationState.amount,
            setValidationState: state => {
              setValidationStateByKey("amount", state);
            },
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
        />
        <DescribtionField
          cssClasses={[classes.AddExpenseWindow__field_multiLine]}
          controlParams={[
            state.descriprion,
            newValue => {
              setStateByKey("descriprion", newValue);
            },
          ]}
          validation={{
            validationState: validationState.descriprion,
            setValidationState: state => {
              setValidationStateByKey("descriprion", state);
            },
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
