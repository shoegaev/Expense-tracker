import React from "react";
import cl from "./SortingSelectionPageStyle.module.scss";
import {WindowWithNavigationProps} from "../../../UI/WindowWithNavigation/WindowWithNavigation";
import SelectionList, {
  SelectionListProps,
} from "../../../UI/SelectionList/SelectionList";

export interface SortingSelectionProps {
  cssClasses?: string[];
  goToRef: WindowWithNavigationProps["goToRef"];
  controlParams: SelectionListProps["controlParams"];
}

const SortingSelectionPage = ({
  cssClasses,
  goToRef,
  controlParams,
}: SortingSelectionProps) => {
  const goBack = () => {
    if (goToRef.current) goToRef.current();
  };
  return (
    <div className={[cl.SortingSelectionPage, ...(cssClasses ?? [])].join(" ")}>
      <div onClick={goBack} className={cl.SortingSelectionPage__backButton}>
        {"<-"}
      </div>
      <div className={cl.SortingSelectionPage__heading}>
        Select sorting type
      </div>
      <SelectionList
        cssClasses={[cl.SortingSelectionPage__list]}
        controlParams={controlParams}
        onClick={goBack}></SelectionList>
    </div>
  );
};

export default SortingSelectionPage;
