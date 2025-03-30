import React, {useState} from "react";
import {AppData, Expense} from "../types/appDataType";
import ExpenseList from "../components/ExpenseList/ExpenseList";
import pagesCl from "./PagesStyles.module.scss";
import cl from "./HistoryPagesStyle.module.scss";
import MainButton from "../components/UI/MainButton/MainButton";
import AddExpenseWindow, {
  AddExpenseWindowState,
  defaulAddExpenseWindowState,
} from "../components/addExpenseWindow/AddExpenseWindow";

type HistoryPageProps = {
  appDataState: AppData;
  addExpense: (params: Expense) => true | "Invalid Date" | "Invalid category";
};

const HistoryPage = (props: HistoryPageProps) => {
  const [addWindowState, setAddWindowState] = useState<AddExpenseWindowState>(
    defaulAddExpenseWindowState,
  );
  return (
    <div
      className={[
        pagesCl.Page,
        cl.HistoryPage,
        addWindowState.isOpen ? cl.HistoryPage_addingExpense : "",
      ].join(" ")}>
      <div className={cl.HistoryPage__mainContent}>
        <ExpenseList {...props}></ExpenseList>
        <div className={cl.HistoryPage__buttons}>
          <MainButton
            className={cl.HistoryPage__addButton}
            text="Add expense"
            callback={() => {
              setAddWindowState({...addWindowState, isOpen: true});
            }}></MainButton>
        </div>
      </div>

      <AddExpenseWindow
        className={cl.HistoryPage__addExpenseWindow}
        AddExpenseWindowState={addWindowState}
        setAddExpenseWindowState={setAddWindowState}
        addExpense={props.addExpense}></AddExpenseWindow>
    </div>
  );
};

export default HistoryPage;
