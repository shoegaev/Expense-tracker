/* eslint-disable max-lines-per-function */
import React, {useState} from "react";
import {ControlParams} from "../../../../types/ControlParamsType";
import DateField from "../../../UI/InputFields/FormTextField/DateField/DateField";
import cl from "./DateFilterPageStyle.module.scss";
import {StateWithValidation} from "../../../../types/validationTypes";
import {DateFilterPage as DateFilterPageType} from "../filterPagesTypes";
import {WindowWithNavigationProps} from "../../../UI/WindowWithNavigation/WindowWithNavigation";
import MainButton from "../../../UI/MainButton/MainButton";

export type DateFilterFields = DateFilterPageType["fields"];

interface DateFilterStateWithValidation {
  from: StateWithValidation<string>;
  to: StateWithValidation<string>;
}
export interface DateFilterProps {
  cssClasses?: string[];
  controlParams: ControlParams<DateFilterFields>;
  heading: string;
  goToRef: WindowWithNavigationProps["goToRef"];
}

const DateFilterPage = ({
  heading,
  controlParams,
  cssClasses,
  goToRef,
}: DateFilterProps) => {
  const [fields, setFields] = controlParams;
  const [stateWithValidation, setStateWithValidation] =
    useState<DateFilterStateWithValidation>({
      from: {
        value: fields.from,
        validation: {
          isValid: true,
          errMessage: null,
        },
      },
      to: {
        value: fields.to,
        validation: {
          isValid: true,
          errMessage: null,
        },
      },
    });
  const isDataValid =
    stateWithValidation.from.validation.isValid &&
    stateWithValidation.to.validation.isValid &&
    (stateWithValidation.from.value || stateWithValidation.to.value);
  const fieldsJSX = Object.keys(fields).map(key => {
    return (
      <DateField
        isRequired={false}
        labelText={key}
        cssClasses={[cl.DateFilterPage__dateField]}
        fieldCssClasses={[cl.DateFilterPage__field]}
        key={key}
        controlParams={[
          stateWithValidation[key as keyof DateFilterStateWithValidation],
          newValue => {
            if (typeof newValue !== "function")
              setStateWithValidation({...stateWithValidation, [key]: newValue});
          },
        ]}
      />
    );
  });

  const className = [cl.DateFilterPage, ...(cssClasses ?? [])].join(" ");
  return (
    <div className={className}>
      <div
        onClick={() => {
          if (goToRef.current) goToRef.current();
          setStateWithValidation({
            from: {...stateWithValidation.from, value: fields.from},
            to: {...stateWithValidation.to, value: fields.to},
          });
        }}
        className={cl.DateFilterPage__backButton}>
        {"<-"}
      </div>
      <div className={cl.DateFilterPage__heading}>{heading}</div>
      <div
        onClick={e => {
          // to prevent SortsAndFilters window close when selecting date in DatePicker
          e.stopPropagation();
        }}
        className={cl.DateFilterPage__fields}>
        {fieldsJSX}
      </div>
      <div className={cl.DateFilterPage__buttonContainer}>
        <span
          className={[
            cl.DateFilterPage__warningText,
            isDataValid ? "" : cl.DateFilterPage__warningText_visible,
          ].join(" ")}>
          Fill in at least one field without errors
        </span>
        <MainButton
          text="Submit"
          isDisabled={!isDataValid}
          className={cl.DateFilterPage__submitButton}
          callback={() => {
            if (!isDataValid) {
              return;
            }
            if (
              new Date(stateWithValidation.to.value).valueOf() <
              new Date(stateWithValidation.from.value).valueOf()
            ) {
              setFields({
                from: stateWithValidation.to.value,
                to: stateWithValidation.from.value,
              });
            } else {
              setFields({
                from: stateWithValidation.from.value,
                to: stateWithValidation.to.value,
              });
            }
            if (goToRef.current) goToRef.current("main");
          }}
        />
      </div>
    </div>
  );
};

export default DateFilterPage;
