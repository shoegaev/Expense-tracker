import React from "react";
import cl from "./SelectionListStyle.module.scss";
import {ControlParams} from "../../../types/ControlParamsType";

export interface SelectionListState {
  options?: string[];
  selected?: number | number[];
}
// if selected - number or undefined, multiple selection is off

export interface SelectionListProps {
  controlParams: ControlParams<SelectionListState>;
  cssClasses?: string[];
}
const SelectionList = ({controlParams, cssClasses}: SelectionListProps) => {
  const [state, setState] = controlParams;
  const isIndexSelected = (index: number): boolean =>
    (typeof state.selected === "object" && state.selected.includes(index)) ||
    state.selected === index;

  const options = state.options?.map((option, index) => {
    const className = [
      cl.SelectionList__option,
      isIndexSelected(index) ? cl.SelectionList__option_selected : "",
    ].join(" ");
    return (
      <div
        className={className}
        key={index}
        onClick={() => {
          if (isIndexSelected(index)) {
            if (typeof state.selected === "object") {
              setState({
                ...state,
                selected: state.selected.filter(i => i !== index),
              });
            }
          } else {
            if (typeof state.selected === "object") {
              setState({
                ...state,
                selected: [...state.selected, index],
              });
            } else {
              setState({...state, selected: index});
            }
          }
        }}>
        <span className={cl.SelectionList__selectedStatus}>Selected</span>
        <span className={cl.SelectionList__optionText}>{option}</span>
      </div>
    );
  });
  const className = [cl.SelectionList, ...(cssClasses ?? [])].join(" ");
  return <div className={className}>{options}</div>;
};

export default SelectionList;
