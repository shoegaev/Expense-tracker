import React from "react";
import cl from "./SortsAndFiltersMainPageStyles.module.scss";
import MainButton from "../../../UI/MainButton/MainButton";
import {WindowWithNavigationProps} from "../../../UI/WindowWithNavigation/WindowWithNavigation";

export interface SortsAndFiltersMainPageProps {
  cssClasses?: string[];
  sorting: string;
  goToRef: WindowWithNavigationProps["goToRef"];
}

const SortsAndFiltersMainPage = ({
  cssClasses,
  sorting,
  goToRef,
}: SortsAndFiltersMainPageProps) => {
  return (
    <div
      className={[cl.SortsAndFiltersMainPage, ...(cssClasses ?? [])].join(" ")}>
      <div className={cl.SortsAndFiltersMainPage__sorting}>
        <span className={cl.SortsAndFiltersMainPage__sortingTitle}>
          Sorting:
        </span>
        <MainButton
          color="grey"
          hoverType="scale"
          text={sorting}
          className={cl.SortsAndFiltersMainPage__sortingButton}
          callback={() => {
            if (goToRef.current) goToRef.current("sorting");
          }}
        />
      </div>
    </div>
  );
};

export default SortsAndFiltersMainPage;
