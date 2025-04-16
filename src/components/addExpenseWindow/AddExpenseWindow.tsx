import React, {useEffect} from "react";
import {Expense} from "../../types/appDataType";
import FormTextField from "../UI/InputFields/FormTextField/FormTextField";
import NumberField from "../UI/InputFields/FormTextField/NumberField/NumberField";
import NameField from "./fields/NameField/NameField";
import classes from "./AddExpenseWindowStyle.module.scss";
import MainButton from "../UI/MainButton/MainButton";
import ArrowIcon from "../../assets/icons/Arrow.svg?react";
import DescribtionField from "./fields/DescribtionField/DescribtionField";
import DateField from "../UI/InputFields/FormTextField/DateField/DateField";

export type AddExpenseWindowState = {
  fields: {
    [name in keyof Expense]: {
      value: Expense[name];
      validation: {isValid: boolean; errMessage: string | null};
    };
  };
  isDataValid: boolean;
  isOpen: boolean;
};

export const defaulAddExpenseWindowState: AddExpenseWindowState = {
  fields: {
    name: {value: "", validation: {isValid: false, errMessage: null}},
    categoryName: {
      value: "food",
      validation: {isValid: true, errMessage: null},
    },
    amount: {value: "", validation: {isValid: false, errMessage: null}},
    date: {value: "", validation: {isValid: false, errMessage: null}},
    descriprion: {value: "", validation: {isValid: true, errMessage: null}},
  },
  isDataValid: false,
  isOpen: false,
};

export interface AddExpenseWindowProps {
  className?: string;
  addExpense: (params: Expense) => true | "Invalid Date" | "Invalid category";
  AddExpenseWindowState: AddExpenseWindowState;
  setAddExpenseWindowState: React.Dispatch<
    React.SetStateAction<AddExpenseWindowState>
  >;
}

// eslint-disable-next-line max-lines-per-function
const AddExpenseWindow = ({
  className,
  AddExpenseWindowState: state,
  addExpense,
  setAddExpenseWindowState: setState,
}: AddExpenseWindowProps) => {
  const setFieldValueByKey = <T extends keyof AddExpenseWindowState["fields"]>(
    fieldName: T,
    valueOrHandler:
      | AddExpenseWindowState["fields"][T]
      | ((
          prevValue: AddExpenseWindowState["fields"][T],
        ) => AddExpenseWindowState["fields"][T]),
  ): void => {
    if (typeof valueOrHandler === "function") {
      setState(prev => {
        return {
          ...prev,
          fields: {
            ...prev.fields,
            [fieldName]: valueOrHandler(prev.fields[fieldName]),
          },
        };
      });
    } else {
      setState({
        ...state,
        fields: {
          ...state.fields,
          [fieldName]: valueOrHandler,
        },
      });
    }
  };

  useEffect(() => {
    let isDataValid = true;
    for (const value of Object.values(state.fields)) {
      if (!value.validation?.isValid) {
        isDataValid = false;
        break;
      }
    }
    if (state.isDataValid !== isDataValid) {
      setState({...state, isDataValid: !state.isDataValid});
    }
  }, [state]);

  function closeAndClearWindow(): void {
    setState(defaulAddExpenseWindowState);
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
      <div className={classes.AddExpenseWindow__formFields}>
        <NameField
          cssClasses={[classes.AddExpenseWindow__formField]}
          fieldCssClasses={[classes.AddExpenseWindow__field]}
          controlParams={[
            state.fields.name,
            newValue => {
              setFieldValueByKey("name", newValue);
            },
          ]}
        />
        <FormTextField
          cssClasses={[classes.AddExpenseWindow__formField]}
          fieldCssClasses={[classes.AddExpenseWindow__field]}
          controlParams={[
            state.fields.categoryName,
            newValue => {
              setFieldValueByKey("categoryName", newValue);
            },
          ]}
          ValidationRequirements={{isRequired: false, validations: []}} //заглушка//
          placeholder="Category"
          labelText="Category:"
          disabled={true}
        />
        <NumberField
          placeholder="Amount"
          labelText="Amount:"
          cssClasses={[classes.AddExpenseWindow__formField]}
          fieldCssClasses={[classes.AddExpenseWindow__field]}
          controlParams={[
            state.fields.amount,
            newValue => {
              setFieldValueByKey("amount", newValue);
            },
          ]}
          validationRequirements={{
            validations: [
              {
                callbak: value => {
                  return !value.match(/^0\.{0,1}0{0,}$/);
                },
              },
            ],
          }}
        />
        <DateField
          placeholder="MM/DD/YYYY"
          labelText="Date"
          cssClasses={[classes.AddExpenseWindow__formField]}
          fieldCssClasses={[classes.AddExpenseWindow__field]}
          controlParams={[
            state.fields.date,
            newValue => {
              setFieldValueByKey("date", newValue);
            },
          ]}
        />
        <DescribtionField
          cssClasses={[
            classes.AddExpenseWindow__formField,
            classes.AddExpenseWindow__formField_multiLine,
          ]}
          fieldCssClasses={[classes.AddExpenseWindow__field]}
          controlParams={[
            state.fields.descriprion,
            newValue => {
              setFieldValueByKey("descriprion", newValue);
            },
          ]}
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
          const expense: Expense = {} as Expense;
          for (const key in state.fields) {
            expense[key as keyof Expense] =
              state.fields[key as keyof Expense].value;
          }
          addExpense(expense);
          closeAndClearWindow();
        }}
        isDisabled={!state.isDataValid}
      />
    </div>
  );
};

export default AddExpenseWindow;
