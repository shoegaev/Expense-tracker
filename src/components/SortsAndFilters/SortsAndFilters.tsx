import React, {useEffect, useRef} from "react";
import {ControlParams} from "../../types/ControlParamsType";
import {
  ExpenseListSortsAndFilters,
  ExpenseListSorting,
} from "../../types/sortsAndFiltersType";
import cl from "./SortsAndFiltersStyle.module.scss";

export interface SortsAndFiltersState extends ExpenseListSortsAndFilters {
  isOpen: boolean;
}

export const SortsAndFiltersDeafaultState: SortsAndFiltersState = {
  isOpen: false,
  sorting: ExpenseListSorting.dateDescending,
};

export interface SortsAndFiltersProps {
  controlParams: ControlParams<SortsAndFiltersState>;
  cssClasses?: string[];
  onOpenCssClasses?: string[];
}

const SortsAndFilters = ({
  controlParams,
  cssClasses,
  onOpenCssClasses,
}: SortsAndFiltersProps) => {
  const [state, setState] = controlParams;
  const ref = useRef<null | HTMLDivElement>(null);
  const onClickHandler = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setState({...state, isOpen: false});
    }
  };
  useEffect(() => {
    document.addEventListener("click", onClickHandler);
    return () => {
      document.removeEventListener("click", onClickHandler);
    };
  }, [state.isOpen]);
  const className = [
    cl.SortsAndFilters,
    ...(cssClasses ?? []),
    ...(state.isOpen && onOpenCssClasses ? onOpenCssClasses : []),
  ].join(" ");
  return <div ref={ref} className={className}></div>;
};

export default SortsAndFilters;
