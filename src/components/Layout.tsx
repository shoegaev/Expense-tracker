import React, {useState, useEffect} from "react";
import BurgerMenuButton from "./UI/buttons/BurgerMenuButton/BurgerMenuButton";
import ModalBackdrop from "./UI/modalBackdrop/ModalBackdrop";
import {Outlet} from "react-router-dom";
import classes from "./LayoutStyle.module.scss";
import Header from "./Header/Header";

const Layout = () => {
  const isModalWindowOpenState = useState(false);
  const [isModalWindowOpen, setIsModalWindowOpen] = isModalWindowOpenState;
  useEffect(() => {
    if (!isModalWindowOpen) return;
    let width = document.documentElement.clientWidth;
    const onResize = (): void => {
      const currWidth = document.documentElement.clientWidth;
      if (width <= 800 && currWidth > 800 && isModalWindowOpen) {
        setIsModalWindowOpen(false);
      }
      width = currWidth;
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [isModalWindowOpen]);
  return (
    <>
      <ModalBackdrop
        cssClasses={[classes.ModalBackdrop]}
        isVisibleControlParams={isModalWindowOpenState}
      />
      <Header isOpenControlParams={isModalWindowOpenState} />
      <BurgerMenuButton
        cssClasses={[classes.BurgerMenuButton]}
        controlParams={isModalWindowOpenState}
        onClick={() => {
          document.body.style.overflow = isModalWindowOpen ? "" : "hidden";
        }}
      />
      <main className={classes.Content}>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default Layout;
