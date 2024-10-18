import React from "react";
import {AppData, Expense} from "../../../types/appDataType";
import classes from "./ExpenseLineStyle.module.scss";

type ExpenseProps = {
  appState: AppData;
  params: Expense;
};

const ExpenseLine = ({params}: ExpenseProps) => {
  return (
    <div className={classes.ExpenseLine}>
      <div className={classes.ExpenseLine_color}>
        {/* {appState.categories[params.categoryName].color} */} Color
      </div>
      <span className={classes.ExpenseLine_name}>{params.name}</span>
      <span className={classes.ExpenseLine_amount}>{params.amount}</span>
      <span className={classes.ExpenseLine_date}>{params.date}</span>
      <div className={classes.ExpenseLine_menuButton}>
        {/* menu button (delete/repeat/edit) */}
      </div>
    </div>
  );
};

export default ExpenseLine;
