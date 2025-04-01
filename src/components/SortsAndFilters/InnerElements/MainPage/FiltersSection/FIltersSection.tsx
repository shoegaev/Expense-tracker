/* eslint-disable max-lines-per-function */
import React from "react";
import cl from "./FiltersSectionStyle.module.scss";
import {WindowWithNavigationProps} from "../../../../UI/WindowWithNavigation/WindowWithNavigation";
import {ControlParams} from "../../../../../types/ControlParamsType";
import {FilterPage} from "../../filterPagesTypes";
import MainButton from "../../../../UI/MainButton/MainButton";

export interface FilterSectionState {
  filters: {
    [filterName: string]: FilterPage;
  };
}

export interface FilterSectionProps {
  cssClasses?: string[];
  controlParams: ControlParams<FilterSectionState>;
  goToRef: WindowWithNavigationProps["goToRef"];
}

const FiltersSection = ({
  goToRef,
  controlParams,
  cssClasses,
}: FilterSectionProps) => {
  const [state] = controlParams;
  const {filters} = state;
  const activeFiltersJSX = Object.keys(filters).map(filterName => {
    const filter = filters[filterName];
    const fields = filter.fields;
    let textValue: string;
    if (filter.type === "date" || filter.type === "number") {
      textValue =
        fields.from && fields.to
          ? `${fields.from} - ${fields.to}`
          : !fields.from && !fields.to
            ? `${filter.textWhenNotSelected}`
            : fields.from
              ? `From ${fields.from}`
              : `Up to ${fields.to}`;
    } else {
      textValue = "";
    }
    return (
      <div className={cl.FilterSection__filter} key={filterName}>
        <div className={cl.FilterSection__filterTitle}>{filter.title}</div>
        <MainButton
          text={textValue}
          color="grey"
          className={cl.FilterSection__filterButton}
          callback={() => {
            if (goToRef.current) {
              goToRef.current(filterName);
            }
          }}
        />
      </div>
    );
  });
  const className = [cl.FilterSection, ...(cssClasses ?? [])].join("");
  return (
    <div className={className}>
      <div className={cl.FilterSection__topPanel}>
        <div className={cl.FilterSection__title}>Filters:</div>
        <div className={cl.FilterSection__controlButtons}>
          <MainButton
            text="Cleare all"
            className={cl.FilterSection__controlButton}
          />
        </div>
      </div>
      <div className={cl.FilterSection__activeFiltersList}>
        {activeFiltersJSX}
      </div>
    </div>
  );
};

export default FiltersSection;
