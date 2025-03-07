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
  const goToMain = () => {
    if (goToRef.current) goToRef.current("main");
  };
  return (
    <div className={[cl.SortingSelectionPage, ...(cssClasses ?? [])].join(" ")}>
      <div onClick={goToMain} className={cl.SortingSelectionPage__backButton}>
        {"<-"}
      </div>
      <div>Select sorting type</div>
      <SelectionList
        controlParams={controlParams}
        onClick={goToMain}></SelectionList>
    </div>
  );
};

export default SortingSelectionPage;
