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
}

export interface WindowWithNavigationProps {
  controlParams: ControlParams<WindowWithNavigationState>;
  elements: WindowWithNavigationElement[];
  goToRef: React.MutableRefObject<((to?: string | number) => void) | null>;
  cssClasses?: string[];
}

const WindowWithNavigation = ({
  elements,
  goToRef,
  cssClasses,
  controlParams,
}: WindowWithNavigationProps) => {
  const [state, setState] = controlParams;
  goToRef.current = (to?: string | number) => {
    if (typeof to === "number") {
      if (to < 0) {
        setState({
          history: state.history.slice(
            0,
            Math.abs(to) >= state.history.length ? 1 : to,
          ),
        });
      } else {
        setState({history: state.history.slice(0, to)});
      }
      return;
    }
    const elementName = to ?? state.history[state.history.length - 2];
    if (!elements.find(obj => obj.name === elementName)) {
      return;
    }
    if (state.history.includes(elementName)) {
      setState({
        history: state.history.slice(0, state.history.indexOf(elementName) + 1),
      });
    } else {
      setState({
        history: [...state.history, elementName],
      });
    }
  };
  const className = [cl.WindowWithNavigation, ...(cssClasses || [])].join(" ");
  const innerElements = elements.map(obj => {
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
// окно с анимированными переходами между "страницами" и историей:
// -state: {
// -history: string[] - массив с именами страниц в порядке их открытия (т.е. история),
// последний элемент - текущий открытый
// -elements: - массив элементов;
// элемент: {
//  element: JSX
//  name: string
// }
//props {
// -goToRef: (to: string)=>void - реф в который будет записана функция навигации к опред элементу
// controlParams: ....
// }
//
//
// }

// три контейнера:
// -левый: элементы являющиеся "предыдущими"
// для открытого на данный момент
// -средний: текущий открытый элемент
// -правый контейнер: все остальные элементы

// история: массив с айди элементов в порядке открытия
