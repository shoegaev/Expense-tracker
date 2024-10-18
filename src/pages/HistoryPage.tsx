import React from "react";
import {AppData, Expense} from "../types/appDataType";
import ExpenseList from "../components/UI/ExpenseList/ExpenseList";
import classes from "./PagesStyles.module.scss";
import MainButton from "../components/UI/MainButton/MainButton";

type HistoryPageProps = {
  appState: AppData;
  addExpense: (params: Expense) => true | "Invalid Date" | "Invalid category";
};

const HistoryPage = (props: HistoryPageProps) => {
  return (
    <div className={classes.Page}>
      <ExpenseList {...props}></ExpenseList>
      <MainButton
        text="Add expense"
        callback={() => {
          props.addExpense({
            name: "Name",
            categoryName: "food",
            amount: 5,
            date: Date.now(),
          });
        }}></MainButton>
    </div>
  );
};

export default HistoryPage;
