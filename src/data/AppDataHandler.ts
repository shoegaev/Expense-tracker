import {AppData, Expense} from "../types/appDataType";
import {insertInSortedArray} from "../utils/insertInSortedArray";
import {v4 as uuidv4} from "uuid";

export class AppDataHandler {
  private readonly appData: AppData;

  constructor(initData?: AppData) {
    this.appData = initData ?? {
      expenses: {},
      categories: {food: {amount: "0", expenses: [], color: "color-code"}},
      expensesByName: {},
      expensesSorted: {
        date: [],
        amount: [],
      },
    };
  }

  public getAppData(): AppData {
    return JSON.parse(JSON.stringify(this.appData));
  }

  public addExpense(
    params: Expense,
  ): true | "Invalid Date" | "Invalid category" {
    const date = new Date(params.date);
    const isCategoryExist = Boolean(
      this.appData.categories[params.categoryName],
    );
    if (date.toString() === "Invalid Date") {
      return "Invalid Date";
    }
    if (!isCategoryExist) {
      return "Invalid category";
    }
    const expense: Expense = {
      ...params,
      date: String(date.valueOf()),
    };
    this.integrateExpense(expense);
    return true;
  }

  public integrateExpense(expense: Expense): void {
    const id = this.createId();
    this.appData.expenses[id] = expense;
    this.appData.categories[expense.categoryName].expenses.push(id);
    if (this.appData.expensesByName[expense.name]) {
      this.appData.expensesByName[expense.name].push(id);
    } else {
      this.appData.expensesByName[expense.name] = [id];
    }
    const dateEqualityCallback = (id1: string, id2: string): 1 | -1 | 0 => {
      const date1 = this.appData.expenses[id1].date;
      const date2 = this.appData.expenses[id2].date;
      if (date1 < date2) {
        return 1;
      }
      if (date1 > date2) {
        return -1;
      }
      return 0;
    };
    const amountEqualityCallback = (id1: string, id2: string): 1 | -1 | 0 => {
      const amount1 = this.appData.expenses[id1].date;
      const amount2 = this.appData.expenses[id2].date;
      if (amount1 > amount2) {
        return 1;
      }
      if (amount1 < amount2) {
        return -1;
      }
      return 0;
    };
    insertInSortedArray(
      this.appData.expensesSorted.amount,
      id,
      amountEqualityCallback,
    );
    insertInSortedArray(
      this.appData.expensesSorted.date,
      id,
      dateEqualityCallback,
    );
  }

  private createId(): string {
    let id = uuidv4();
    while (this.appData.expenses[id]) {
      id = uuidv4();
    }
    return id;
  }
}
