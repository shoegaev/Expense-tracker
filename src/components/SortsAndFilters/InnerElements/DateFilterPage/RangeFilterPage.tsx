/* eslint-disable max-lines-per-function */
import React, {useState} from "react";
import {ControlParams} from "../../../../types/ControlParamsType";
import DateField from "../../../UI/InputFields/FormTextField/DateField/DateField";
import cl from "./RangeFilterPageStyle.module.scss";
import {StateWithValidation} from "../../../../types/validationTypes";
import {RangeFilterPage as RangeFilterPageType} from "../filterPagesTypes";
import {WindowWithNavigationProps} from "../../../UI/WindowWithNavigation/WindowWithNavigation";
import MainButton from "../../../UI/MainButton/MainButton";
import NumberField from "../../../UI/InputFields/FormTextField/NumberField/NumberField";
import {FieldWithSpecifiedValifationProps} from "../../../UI/InputFields/FormTextField/FieldWithSpecifiedValifationType";

export type RangeFilterFields = RangeFilterPageType["fields"];

interface RangeFilterStateWithValidation {
  from: StateWithValidation<string>;
  to: StateWithValidation<string>;
}
export interface RangeFilterProps {
  cssClasses?: string[];
  type: RangeFilterPageType["type"];
  rangeSelector?: {
    min: string;
    max: string;
  };
  controlParams: ControlParams<RangeFilterFields>;
  heading: string;
  goToRef: WindowWithNavigationProps["goToRef"];
}

const sortFromAndToValue = (
  from: string,
  to: string,
  type: RangeFilterPageType["type"],
): {from: string; to: string} => {
  let finalTo: string;
  let finalFrom: string;
  if (from && to) {
    if (type === "date") {
      finalTo = new Date(from).valueOf() > new Date(to).valueOf() ? from : to;
    } else {
      finalTo = Number(from) > Number(to) ? from : to;
    }
    finalFrom = finalTo === from ? to : from;
  } else {
    finalFrom = from;
    finalTo = to;
  }
  return {from: finalFrom, to: finalTo};
};

const RangeFilterPage = ({
  heading,
  controlParams,
  cssClasses,
  goToRef,
  type,
}: RangeFilterProps) => {
  const [fields, setFields] = controlParams;
  const [stateWithValidation, setStateWithValidation] =
    useState<RangeFilterStateWithValidation>({
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
  const {from, to} = sortFromAndToValue(
    stateWithValidation.from.value,
    stateWithValidation.to.value,
    type,
  );

  const fieldsJSX = Object.keys(fields).map(key => {
    const fieldName = key as keyof RangeFilterStateWithValidation;
    const props: FieldWithSpecifiedValifationProps = {
      validationRequirements: {
        isRequired: false,
      },
      labelText: key,
      cssClasses: [cl.RangeFilterPage__dateField],
      fieldCssClasses: [cl.RangeFilterPage__field],
      controlParams: [
        stateWithValidation[fieldName],
        newValue => {
          if (typeof newValue !== "function") {
            setStateWithValidation({...stateWithValidation, [key]: newValue});
          } else {
            setStateWithValidation(prev => {
              return {...prev, [key]: newValue(prev[fieldName])};
            });
          }
        },
      ],
    };
    if (type === "date") {
      return <DateField key={key} {...props} />;
    } else {
      return <NumberField key={key} {...props} />;
    }
  });
  const className = [cl.RangeFilterPage, ...(cssClasses ?? [])].join(" ");
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
        className={cl.RangeFilterPage__backButton}>
        {"<-"}
      </div>
      <div className={cl.RangeFilterPage__heading}>{heading}</div>
      <div
        onClick={e => {
          // to prevent SortsAndFilters window close when selecting date in DatePicker
          e.stopPropagation();
        }}
        className={cl.RangeFilterPage__fields}>
        {fieldsJSX}
      </div>
      <div className={cl.RangeFilterPage__buttonContainer}>
        <span
          className={[
            cl.RangeFilterPage__warningText,
            isDataValid ? "" : cl.RangeFilterPage__warningText_visible,
          ].join(" ")}>
          Fill in at least one field without errors
        </span>
        <MainButton
          text="Submit"
          isDisabled={!isDataValid}
          className={cl.RangeFilterPage__submitButton}
          callback={() => {
            if (!isDataValid) {
              return;
            }
            setFields({
              from: from,
              to: to,
            });
            if (goToRef.current) goToRef.current("main");
          }}
        />
      </div>
    </div>
  );
};

export default RangeFilterPage;
