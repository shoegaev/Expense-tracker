/* eslint-disable max-lines-per-function */
import React from "react";
import FormTextField from "../../../UI/FormTextField/FormTextField";
import {AddExpenseWindowField} from "../AddExpenseWindowFieldType";
import getStringDate from "../../../../utils/getStringDate";
import {ReactComponent as CalendarIcon} from "../../../../assets/icons/CalendarIcon.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cl from "./DateFieldStyle.module.scss";

const DateField = ({
  validation,
  controlParams,
  ...props
}: AddExpenseWindowField) => {
  const [value, setValue] = controlParams;
  // console.log(value);
  const valueInDate = new Date(value);
  const timestamp = valueInDate.valueOf() || Date.now();
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
                setValue(getStringDate(date));
              }
            }}
          />,
        ],
      }}
      validation={{
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
                arr[0]?.length <= 2 &&
                arr[1]?.length <= 2 &&
                arr[2]?.length <= 4;
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
        ...validation,
      }}
    />
  );
};

export default DateField;
