import cl from "./SortsAndFiltersMainPageStyles.module.scss";
import MainButton from "../../../UI/MainButton/MainButton";
import {WindowWithNavigationProps} from "../../../UI/WindowWithNavigation/WindowWithNavigation";
import {FilterPage} from "../filterPagesTypes";
import {ControlParams} from "../../../../types/ControlParamsType";
import FiltersSection from "./FiltersSection/FIltersSection";

export interface SortsAndFiltersMainPageState {
  filters: {
    [filterName: string]: FilterPage;
  };
}

export interface SortsAndFiltersMainPageProps {
  cssClasses?: string[];
  controlParams: ControlParams<SortsAndFiltersMainPageState>;
  sorting: string;
  goToRef: WindowWithNavigationProps["goToRef"];
}

const SortsAndFiltersMainPage = ({
  cssClasses,
  sorting,
  controlParams,
  goToRef,
}: SortsAndFiltersMainPageProps) => {
  return (
    <div
      className={[cl.SortsAndFiltersMainPage, ...(cssClasses ?? [])].join(" ")}>
      <div className={cl.SortsAndFiltersMainPage__sorting}>
        <span className={cl.SortsAndFiltersMainPage__sortingTitle}>
          Sorting:
        </span>
        <MainButton
          color="grey"
          hoverType="scale"
          text={sorting}
          className={cl.SortsAndFiltersMainPage__sortingButton}
          callback={() => {
            if (goToRef.current) goToRef.current("sorting");
          }}
        />
      </div>
      <FiltersSection
        cssClasses={[cl.SortsAndFiltersMainPage__FiltersSection]}
        goToRef={goToRef}
        controlParams={controlParams}
      />
    </div>
  );
};

export default SortsAndFiltersMainPage;
