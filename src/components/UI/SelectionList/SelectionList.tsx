import React from "react";
import cl from "./SelectionListStyle.module.scss";
import {ControlParams} from "../../../types/ControlParamsType";

export interface SelectionListState {
  options: string[];
  selected: string | string[];
}
// if selected: string or undefined, multiple selection is off

export interface SelectionListProps {
  cssClasses?: string[];
  controlParams: ControlParams<SelectionListState>;
  onClick?: (option: string, selected: string | string[]) => void;
}
const SelectionList = ({
  controlParams,
  cssClasses,
  onClick,
}: SelectionListProps) => {
  const [state, setState] = controlParams;
  const isValueSelected = (value: string): boolean =>
    (typeof state.selected === "object" && state.selected.includes(value)) ||
    state.selected === value;
  const options = state.options?.map(option => {
    const className = [
      cl.SelectionList__option,
      isValueSelected(option) ? cl.SelectionList__option_selected : "",
    ].join(" ");
    return (
      <div
        className={className}
        key={option}
        onClick={() => {
          if (onClick) onClick(option, state.selected);
          if (isValueSelected(option)) {
            if (typeof state.selected === "object") {
              setState({
                ...state,
                selected: state.selected.filter(i => i !== option),
              });
            }
          } else {
            if (typeof state.selected === "object") {
              setState({
                ...state,
                selected: [...state.selected, option],
              });
            } else {
              setState({...state, selected: option});
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
