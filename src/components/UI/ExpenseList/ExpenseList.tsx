import React from "react";
import classes from "./ExpenseListStyle.module.scss";
import {AppData} from "../../../types/appDataType";
import ExpenseLine from "../ExpenseLine/EpxenseLine";

type ExpenseListProps = {
  appState: AppData;
};

const ExpenseList = ({appState}: ExpenseListProps) => {
  const ExpenseLines = Object.keys(appState.expenses).map(key => {
    return (
      <ExpenseLine
        key={key}
        appState={appState}
        params={appState.expenses[key]}></ExpenseLine>
    );
  });

  return <div className={classes.ExpenseList}>{ExpenseLines}</div>;
};

export default ExpenseList;
