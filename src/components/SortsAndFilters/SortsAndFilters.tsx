/* eslint-disable max-lines-per-function */
import React, {useEffect, useRef, useState} from "react";
import {ControlParams} from "../../types/ControlParamsType";
import cl from "./SortsAndFiltersStyle.module.scss";
import WindowWithNavigation, {
  WindowWithNavigationProps,
  WindowWithNavigationState,
} from "../UI/WindowWithNavigation/WindowWithNavigation";
import SortsAndFiltersMainPage from "./InnerElements/MainPage/SortsAndFiltersMainPage";
import SortingSelectionPage from "./InnerElements/sortingSelectionPage/SortingSelectionPage";

export interface SortsAndFiltersState {
  isOpen: boolean;
  sorting: {
    options: string[];
    selected: string;
  };
}

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
  const windowRef = useRef<null | HTMLDivElement>(null);
  const onClickHandler = (e: Event) => {
    if (windowRef.current && !windowRef.current.contains(e.target as Node)) {
      setState({...state, isOpen: false});
    }
  };
  useEffect(() => {}, [state.isOpen]);
  useEffect(() => {
    if (state.isOpen) {
      document.addEventListener("click", onClickHandler);
    }
    return () => {
      document.removeEventListener("click", onClickHandler);
    };
  });

  const goToRef: WindowWithNavigationProps["goToRef"] = useRef(null);
  const elements: WindowWithNavigationProps["elements"] = [
    {
      name: "main",
      element: (
        <SortsAndFiltersMainPage
          sorting={state.sorting.selected}
          goToRef={goToRef}
        />
      ),
    },
    {
      name: "sorting",
      element: (
        <SortingSelectionPage
          goToRef={goToRef}
          controlParams={[
            state.sorting,
            newSortingState => {
              if (typeof newSortingState === "function") {
                setState(prev => {
                  return {
                    ...prev,
                    sorting: newSortingState(
                      prev.sorting,
                    ) as SortsAndFiltersState["sorting"],
                  };
                });
              } else {
                setState({
                  ...state,
                  sorting: newSortingState as SortsAndFiltersState["sorting"],
                });
              }
            },
          ]}></SortingSelectionPage>
      ),
    },
  ];
  const [windowWithNavigationState, setWindowWithNavigationState] =
    useState<WindowWithNavigationState>({
      history: ["main"],
    });

  const className = [
    cl.SortsAndFilters,
    ...(cssClasses ?? []),
    ...(state.isOpen && onOpenCssClasses ? onOpenCssClasses : []),
  ].join(" ");
  return (
    <div ref={windowRef} className={className}>
      <WindowWithNavigation
        elements={elements}
        cssClasses={[cl.SortsAndFilters__content]}
        controlParams={[
          windowWithNavigationState,
          setWindowWithNavigationState,
        ]}
        goToRef={goToRef}
      />
    </div>
  );
};

export default SortsAndFilters;
