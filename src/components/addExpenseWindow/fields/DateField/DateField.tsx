/* eslint-disable max-lines-per-function */
import React from "react";
import FormTextField from "../../../UI/FormTextField/FormTextField";
import {AddExpenseWindowFieldProps} from "../AddExpenseWindowFieldType";
import getStringDate from "../../../../utils/getStringDate";
import {ReactComponent as CalendarIcon} from "../../../../assets/icons/CalendarIcon.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cl from "./DateFieldStyle.module.scss";
import {validateValue} from "../../../../utils/validateData";
import {ValidationRequirements} from "../../../../types/validationTypes";

const DateField = ({controlParams, ...props}: AddExpenseWindowFieldProps) => {
  const [state, setState] = controlParams;
  const valueInDate = new Date(state.value);
  const timestamp = valueInDate.valueOf() || Date.now();
  const ValidationRequirements: ValidationRequirements<string> = {
    isRequired: true,
    validations: [
      {
        message: "Invalid date",
        callbak: value => {
          const arr = value.split("/");
          const isDatePartsQuantityValid = arr.length === 3;
          const isAllDatePartsArePresent =
            typeof arr.find(x => x === "") !== "string";
          const isDatePartsLengthValid =
            arr[0]?.length <= 2 && arr[1]?.length <= 2 && arr[2]?.length <= 4;
          const isDateValid = new Date(value).toString() !== "Invalid Date";
          return (
            isDatePartsQuantityValid &&
            isAllDatePartsArePresent &&
            isDatePartsLengthValid &&
            isDateValid
          );
        },
      },
    ],
  };
  return (
    <FormTextField
      {...props}
      placeholder="MM/DD/YYYY"
      labelText="Date:"
      controlParams={controlParams}
      symbolsRestrictions={/[0-9/]/}
      innerElements={{
        right: [
          <DatePicker
            key="date"
            className={cl.DatePickerInput}
            toggleCalendarOnIconClick
            calendarIconClassName={cl.DatePickerIcon}
            calendarClassName={cl.DatePickerCalendar}
            showIcon
            icon={<CalendarIcon />}
            selected={new Date(timestamp)}
            withPortal
            todayButton="Set current date"
            dateFormat="MM/dd/yyyy"
            onChange={date => {
              if (date) {
                const stringDate = getStringDate(date);
                setState(validateValue(stringDate, ValidationRequirements));
              }
            }}
          />,
        ],
      }}
      ValidationRequirements={ValidationRequirements}
    />
  );
};

export default DateField;
