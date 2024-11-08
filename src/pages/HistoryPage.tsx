import React, {useState} from "react";
import {AppData, Expense} from "../types/appDataType";
import ExpenseList from "../components/ExpenseList/ExpenseList";
import pagesCl from "./PagesStyles.module.scss";
import cl from "./HistoryPagesStyle.module.scss";
import MainButton from "../components/UI/MainButton/MainButton";
import AddExpenseWindow, {
  AddExpenseWindowState,
} from "../components/addExpenseWindow/AddExpenseWindow";

type HistoryPageProps = {
  appState: AppData;
  addExpense: (params: Expense) => true | "Invalid Date" | "Invalid category";
};

const HistoryPage = (props: HistoryPageProps) => {
  const [addExpenseWindowState, setAddExpenseWindowState] =
    useState<AddExpenseWindowState>({
      name: "",
      categoryName: "food",
      amount: "0",
      date: 0,
      descriprion: "",
      isDataValid: false,
    });
  return (
    <div className={`${pagesCl.Page} ${cl.HistoryPage}`}>
      <div className={cl.HistoryPage_mainContent}>
        <ExpenseList {...props}></ExpenseList>
        <div className={cl.HistoryPage_buttons}>
          <MainButton text="Add expense" callback={() => {}}></MainButton>
        </div>
      </div>
      <AddExpenseWindow
        AddExpenseWindowState={addExpenseWindowState}
        setAddExpenseWindowState={setAddExpenseWindowState}
        addExpense={props.addExpense}></AddExpenseWindow>
    </div>
  );
};

export default HistoryPage;
