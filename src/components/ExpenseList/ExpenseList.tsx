import React from "react";
import classes from "./ExpenseListStyle.module.scss";
import {AppData, Expense} from "../../types/appDataType";
import ExpenseLine from "./ExpenseLine/EpxenseLine";
import {
  ExpenseListOptions,
  ExpenseListSorting,
} from "../../types/sortsAndFiltersType";

type ExpenseListProps = {
  appState: AppData;
  options?: ExpenseListOptions;
  addExpense: (params: Expense) => true | "Invalid Date" | "Invalid category";
};

const ExpenseList = ({
  appState,
  options = {sorting: ExpenseListSorting.dateDescending},
}: ExpenseListProps) => {
  const {searchLine, period, category, sorting} = options;
  let expenseIds: string[];
  if (sorting === ExpenseListSorting.dateAscending) {
    expenseIds = [...appState.expensesSorted.date].reverse();
  } else if (sorting === ExpenseListSorting.dateDescending) {
    expenseIds = [...appState.expensesSorted.date];
  } else if (sorting === ExpenseListSorting.amountAscending) {
    expenseIds = [...appState.expensesSorted.amount];
  } else {
    expenseIds = [...appState.expensesSorted.amount].reverse();
  }
  if (searchLine) {
    const reg = new RegExp(searchLine, "i");
    expenseIds.filter(id => appState.expenses[id].name.match(reg));
  }
  if (category) {
    expenseIds.filter(
      id => appState.expenses[id].categoryName === options.category,
    );
  }
  if (period) {
    expenseIds.filter(id => {
      const date = appState.expenses[id].date;
      return period[0] < date && date < period[1];
    });
  }
  const ExpenseLines = expenseIds.map(id => {
    return (
      <ExpenseLine
        key={id}
        appState={appState}
        params={appState.expenses[id]}></ExpenseLine>
    );
  });

  return <div className={classes.ExpenseList}>{ExpenseLines}</div>;
};

export default ExpenseList;
