import React from "react";
import classes from "./ExpenseListHeaderStyle.module.scss";
import SearchLine from "../../UI/searchLine/SearchLine";
import {ReactComponent as SortsAndFiltersIcons} from "../../../assets/icons/SortsAndFiltersIcon.svg";
import {ControlParams} from "../../../types/ControlParamsType";

interface ExpenseListHeaderProps {
  searchLineParams: ControlParams<string>;
  sortsAndFiltersButtonCallback?: () => void;
}

const ExpenseListHeader = ({
  sortsAndFiltersButtonCallback,
  searchLineParams,
}: ExpenseListHeaderProps) => {
  return (
    <div className={classes.ExpenseListHeader}>
      <div
        onClick={e => {
          e.nativeEvent.stopPropagation();
          if (sortsAndFiltersButtonCallback) sortsAndFiltersButtonCallback();
        }}
        className={classes.ExpenseListHeader__sortsAndFiltersButton}>
        <SortsAndFiltersIcons />
      </div>
      <SearchLine
        cssClasses={[classes.ExpenseListHeader__searchLine]}
        controllParams={searchLineParams}
      />
    </div>
  );
};

export default ExpenseListHeader;
