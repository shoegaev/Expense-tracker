export interface Expense {
  name: string;
  categoryName: string;
  amount: string;
  date: string;
  descriprion: string;
}

export interface Category {
  amount: number;
  expenses: string[]; // sorted by date //
  color: string;
}

export interface AppData {
  expenses: {
    [id: string]: Expense;
  };
  categories: {
    [name: string]: Category;
  };
  expensesByName: {[name: string]: string[]}; // {expenseName: id[]} //
  expensesSorted: {
    date: string[]; // id[] //
    amount: string[]; // id[] //
  };
}
