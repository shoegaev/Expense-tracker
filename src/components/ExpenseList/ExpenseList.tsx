/* eslint-disable max-lines-per-function */
import React, {useState} from "react";
import classes from "./ExpenseListStyle.module.scss";
import {AppData, Expense} from "../../types/appDataType";
import ExpenseLine from "./ExpenseLine/EpxenseLine";
import {
  ExpenseListSortsAndFilters,
  ExpenseListSorting,
} from "../../types/sortsAndFiltersType";
import ExpenseListHeader from "./ExpenseListHeader/ExpenseListHeader";
import SortsAndFilters, {
  SortsAndFiltersDeafaultState,
  SortsAndFiltersState,
} from "../SortsAndFilters/SortsAndFilters";

type ExpenseListProps = {
  appDataState: AppData;
  options?: ExpenseListSortsAndFilters;
  addExpense: (params: Expense) => true | "Invalid Date" | "Invalid category";
};

const ExpenseList = ({
  appDataState,
  options = {sorting: ExpenseListSorting.dateDescending},
}: ExpenseListProps) => {
  const [state, setState] = useState<SortsAndFiltersState>(
    SortsAndFiltersDeafaultState,
  );
  const {searchLine, period, category, sorting} = options;
  //
  const [searchLineValue, setSearchLineValue] = useState("");
  //
  let expenseIds: string[];
  if (sorting === ExpenseListSorting.dateAscending) {
    expenseIds = [...appDataState.expensesSorted.date].reverse();
  } else if (sorting === ExpenseListSorting.dateDescending) {
    expenseIds = [...appDataState.expensesSorted.date];
  } else if (sorting === ExpenseListSorting.amountAscending) {
    expenseIds = [...appDataState.expensesSorted.amount];
  } else {
    expenseIds = [...appDataState.expensesSorted.amount].reverse();
  }
  if (searchLine) {
    const reg = new RegExp(searchLine, "i");
    expenseIds.filter(id => appDataState.expenses[id].name.match(reg));
  }
  if (category) {
    expenseIds.filter(
      id => appDataState.expenses[id].categoryName === options.category,
    );
  }
  if (period) {
    expenseIds.filter(id => {
      const date = appDataState.expenses[id].date;
      return +period[0] < Number(date) && Number(date) < +period[1];
    });
  }
  const ExpenseLines = expenseIds.map(id => {
    return (
      <ExpenseLine key={id} params={appDataState.expenses[id]}></ExpenseLine>
    );
  });

  return (
    <div className={classes.ExpenseList}>
      <ExpenseListHeader
        searchLineParams={[searchLineValue, setSearchLineValue]}
        sortsAndFiltersButtonCallback={() => {
          setState(prev => {
            return {...prev, isOpen: !prev.isOpen};
          });
        }}
      />
      <SortsAndFilters
        controlParams={[state, setState]}
        cssClasses={[classes.ExpenseList__sortsAndFilters]}
        onOpenCssClasses={[classes.ExpenseList__sortsAndFilters_open]}
      />
      <div className={classes.ExpenseList__list}>
        <hr className={classes.ExpenseList__listBorder} />
        <div className={classes.ExpenseList__listContent}>{ExpenseLines}</div>
        <hr className={classes.ExpenseList__listBorder} />
      </div>
    </div>
  );
};

export default ExpenseList;
