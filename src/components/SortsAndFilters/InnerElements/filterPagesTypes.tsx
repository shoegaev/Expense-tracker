interface FilterPageBase {
  title: string;
  heading: string;
  textWhenNotSelected: string;
}

export interface RangeFilterPage extends FilterPageBase {
  type: "date" | "number";
  fields: {
    from: string;
    to: string;
  };
  rangeSelector?: {
    max: string;
    min: string;
  };
}

export type FilterPage = RangeFilterPage;
