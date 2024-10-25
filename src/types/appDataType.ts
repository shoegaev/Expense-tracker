export interface Expense {
  name: string;
  categoryName: string;
  amount: string;
  date: number;
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

// траты:
// --поиск по имени - что бы выдавать предупреждение когда пытаешься добавить
// трату идентичную уже имеющейся
// --поиск по айдишнику - для сортировки трат по категориям (массив айдишников храниться
//  в каждой категории)

// операции:
// ---Сортировки трат по:
// -дате
// -сумме
// Поиск траты по имени: (фильтр по имени)
// Вывод трат только за определенный период.(фильтр по дате)
// ---Фильтры:
// -по имени (для строки поиска),
// -по дате (для вывода трат за определенный период)
