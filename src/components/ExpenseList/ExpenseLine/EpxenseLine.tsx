/* eslint-disable max-lines-per-function */
import React, {useRef} from "react";
import {AppData, Expense} from "../../../types/appDataType";
import {expand, minimize} from "./animations/expenseLineAnimations";
import classes from "./ExpenseLineStyle.module.scss";

type ExpenseProps = {
  appState: AppData;
  params: Expense;
};

const ExpenseLine = ({params}: ExpenseProps) => {
  const date = new Date(params.date).toLocaleString();
  const lineRef = useRef<null | HTMLDivElement>(null);
  const lineContentRef = useRef<null | HTMLDivElement>(null);

  const onSizeButtonClick = () => {
    if (!lineRef.current || !lineContentRef.current) {
      return;
    }
    if (lineRef.current.classList.contains(classes.ExpenseLine__open)) {
      minimize(lineRef.current, 40);
    } else {
      expand(lineRef.current, lineContentRef.current?.clientHeight);
    }
  };

  return (
    <div
      ref={lineRef}
      className={[classes.ExpenseLine].join(" ")}>
      <div ref={lineContentRef} className={classes.ExpenseLine_content}>
        <div className={classes.ExpenseLine_topContent}>
          <div className={classes.ExpenseLine_color}></div>
          <span className={classes.ExpenseLine_name}>{params.name}</span>
          <span
            className={classes.ExpenseLine_amount}>{`${params.amount} $`}</span>
          <span className={classes.ExpenseLine_date}>
            {`${date.slice(0, 5)} ${date.slice(11, -3)}`}
          </span>
          <div className={classes.ExpenseLine_menuButton}>
            {/* menu button (delete/repeat/edit) */}
          </div>
        </div>
        <div className={classes.ExpenseLine_bottomContent}>
          <div className={classes.ExpenseLine_categoryLine}>
            <span className={classes.ExpenseLine_categoryLineHeading}>
              {"Category: "}
            </span>
            <p className={classes.ExpenseLine_categoryLineContent}>
              {params.categoryName}
            </p>
          </div>
          <div className={classes.ExpenseLine_descriptionLine}>
            <span className={classes.ExpenseLine_descriptionLineHeading}>
              {"Description: "}
            </span>
            <p className={classes.ExpenseLine_descriptionLineContent}>
              {params.descriprion}
            </p>
          </div>
        </div>
      </div>
      <div
        className={classes.ExpenseLine_sizeButton}
        onClick={onSizeButtonClick}></div>
    </div>
  );
};

export default ExpenseLine;
