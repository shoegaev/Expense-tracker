export enum ExpenseListSorting {
  dateAscending = "Date (old first)",
  dateDescending = "Date (new first)",
  amountAscending = "Amount (small first)",
  amountDescending = "Date (large first)",
}

export interface ExpenseListOptions {
  searchLine?: string;
  period?: [number, number];
  category?: string;
  sorting: ExpenseListSorting;
}

export enum CategoryListSorting {
  amountAscending = "Amount (small first)",
  amountDescending = "Date (large first)",
  alphabetical = "alphabetical",
  expenseQuantityAscending = "Expense quantity (small first)",
  expenseQuantityDescending = "Expense quantity (large first)",
  lastDateAscending = "Last date (old first)",
  lastDateDescending = "Last date (new first)",
}

export interface CategoryListOptions {
  searchLine?: string;
  sorting: CategoryListSorting;
}
