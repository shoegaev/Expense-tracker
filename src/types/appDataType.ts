export interface Expense {
  name: string;
  categoryName: string;
  amount: string;
  date: string;
  descriprion: string;
}
export interface CategoryInitProps {
  color: string;
  describtion?: string;
  name: string;
}
export interface Category extends CategoryInitProps {
  amount: string;
  expenses: string[]; // sorted by date //
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
