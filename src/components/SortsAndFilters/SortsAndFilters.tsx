/* eslint-disable max-lines-per-function */
import {useEffect, useRef, useState} from "react";
import {ControlParams, StateSetter} from "../../types/ControlParamsType";
import cl from "./SortsAndFiltersStyle.module.scss";
import WindowWithNavigation, {
  WindowWithNavigationProps,
  WindowWithNavigationState,
  WindowWithNavigationElement,
} from "../UI/WindowWithNavigation/WindowWithNavigation";
import SortsAndFiltersMainPage from "./InnerElements/MainPage/SortsAndFiltersMainPage";
import SortingSelectionPage from "./InnerElements/sortingSelectionPage/SortingSelectionPage";
import {
  RangeFilterPage as RangeFilterPageType,
  FilterPage,
} from "./InnerElements/filterPagesTypes";
import RangeFilterPage from "./InnerElements/DateFilterPage/RangeFilterPage";

export interface SortsAndFiltersState {
  isOpen: boolean;
  sorting: {
    options: string[];
    selected: string;
  };
  filters: {
    [filterName: string]: FilterPage;
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
  const onPointerDownHandler = (e: Event) => {
    if (windowRef.current && windowRef.current.contains(e.target as Node)) {
      return;
    }
    window.addEventListener(
      "pointerup",
      e => {
        if (
          windowRef.current &&
          !windowRef.current.contains(e.target as Node)
        ) {
          setTimeout(() => {
            setState({...state, isOpen: false});
          }, 0);
        }
      },
      {once: true},
    );
  };
  useEffect(() => {
    if (state.isOpen) {
      document.addEventListener("pointerdown", onPointerDownHandler);
    }
    return () => {
      document.removeEventListener("pointerdown", onPointerDownHandler);
    };
  });

  const goToRef: WindowWithNavigationProps["goToRef"] = useRef(null);
  const elements: WindowWithNavigationProps["elements"] = [
    {
      name: "main",
      element: (
        <SortsAndFiltersMainPage
          cssClasses={[cl.SortsAndFilters__innerPage]}
          sorting={state.sorting.selected}
          goToRef={goToRef}
          controlParams={[
            ////////////////////////////////////////////////////
            {filters: state.filters},
            newState => {
              if (typeof newState !== "function") {
                setState({...state, filters: newState.filters});
              }
            },
          ]}
        />
      ),
    },
    {
      name: "sorting",
      element: (
        <SortingSelectionPage
          cssClasses={[cl.SortsAndFilters__innerPage]}
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
  Object.keys(state.filters).forEach(key => {
    const filter = state.filters[key];
    const setFilter: StateSetter<RangeFilterPageType["fields"]> = newState => {
      if (typeof newState !== "function") {
        setState({
          ...state,
          filters: {
            ...state.filters,
            [key]: {
              ...state.filters[key],
              fields: newState,
            },
          },
        });
      } else {
        setState(prevState => {
          return {
            ...prevState,
            filters: {
              ...prevState.filters,
              [key]: {
                ...prevState.filters[key],
                fields: newState(prevState.filters[key].fields),
              },
            },
          };
        });
      }
    };
    let element: WindowWithNavigationElement["element"];
    if (filter.type === "date") {
      element = (
        <RangeFilterPage
          goToRef={goToRef}
          cssClasses={[cl.SortsAndFilters__innerPage]}
          heading={state.filters[key].heading}
          controlParams={[filter.fields, setFilter]}
          type="date"
        />
      );
    } else {
      //if (filter.type === "number")
      element = (
        <RangeFilterPage
          type="number"
          cssClasses={[cl.SortsAndFilters__innerPage]}
          controlParams={[filter.fields, setFilter]}
          goToRef={goToRef}
          heading={filter.heading}
        />
      );
    }
    elements.push({name: key, element: element});
  });
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
