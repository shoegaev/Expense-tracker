/* eslint-disable max-lines-per-function */
import React from "react";
import cl from "./WindowWithNavigationStyle.module.scss";
import {ControlParams} from "../../../types/ControlParamsType";

export interface WindowWithNavigationElement {
  element: React.JSX.Element;
  name: string;
}

export interface WindowWithNavigationState {
  history: string[];
  elements: WindowWithNavigationElement[];
}

export interface WindowWithNavigationProps {
  controlParams: ControlParams<WindowWithNavigationState>;
  goToRef: React.MutableRefObject<((to?: string | number) => void) | null>;
  cssClasses?: string[];
}

const WindowWithNavigation = ({
  goToRef,
  cssClasses,
  controlParams,
}: WindowWithNavigationProps) => {
  const [state, setState] = controlParams;
  goToRef.current = (to?: string | number) => {
    if (typeof to === "number") {
      if (to < 0) {
        setState({
          ...state,
          history: state.history.slice(
            0,
            Math.abs(to) >= state.history.length ? 1 : to,
          ),
        });
      } else {
        setState({...state, history: state.history.slice(0, to)});
      }
      return;
    }
    const elementName = to ?? state.history[0];
    if (!state.elements.find(obj => obj.name === elementName)) {
      return;
    }
    if (state.history.includes(elementName)) {
      setState({
        ...state,
        history: state.history.slice(0, state.history.indexOf(elementName) + 1),
      });
    } else {
      setState({
        ...state,
        history: [...state.history, elementName],
      });
    }
  };
  const className = [cl.WindowWithNavigation, ...(cssClasses || [])].join(" ");
  const innerElements = state.elements.map(obj => {
    const isElementInHistory = state.history.includes(obj.name);
    const isElementOpened =
      isElementInHistory &&
      state.history[state.history.length - 1] === obj.name;
    const className = [
      cl.WindowWithNavigation__innerElement,
      isElementOpened
        ? cl.WindowWithNavigation__innerElement_open
        : isElementInHistory
          ? cl.WindowWithNavigation__innerElement_cashed
          : "",
    ].join(" ");
    return (
      <div className={className} key={obj.name}>
        {obj.element}
      </div>
    );
  });
  return <div className={className}>{innerElements}</div>;
};

export default WindowWithNavigation;

