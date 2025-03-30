interface FilterPageBase {
  isActive: boolean;
  title: string;
  heading: string;
  textWhenNotSelected: string;
}

export interface DateFilterPage extends FilterPageBase {
  type: "date";
  fields: {
    from: string;
    to: string;
  };
}

export interface NumberFilterPage extends FilterPageBase {
  type: "number";
  fields: {
    [fieldName: string]: string;
  };
}

export type FilterPage = DateFilterPage | NumberFilterPage;
