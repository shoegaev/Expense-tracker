export enum ExpenseListSorting {
  dateAscending = "Date (old first)",
  dateDescending = "Date (new first)",
  amountAscending = "Amount (small first)",
  amountDescending = "Date (high first)",
}

export interface ExpenseListOptions {
  searchLine?: string;
  period?: [number, number];
  category?: string;
  sorting: ExpenseListSorting;
}
