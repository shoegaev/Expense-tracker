import {AppData, Expense} from "../types/appDataType";
import {v4 as uuidv4} from "uuid";

export class AppDataHandler {
  private appData: AppData;

  constructor(initData?: AppData) {
    this.appData = initData ?? {
      expenses: {},
      categories: {food: {amount: 0, expenses: [], color: "color-code"}},
      expensesByName: {},
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
      date: date.valueOf(),
    };
    const id = this.createId();

    this.appData.expenses[id] = expense;
    this.appData.categories[expense.categoryName].expenses.push(id);
    if (this.appData.expensesByName[expense.name]) {
      this.appData.expensesByName[expense.name].push();
    }
    return true;
  }

  private createId(): string {
    let id = uuidv4();
    while (this.appData.expenses[id]) {
      id = uuidv4();
    }
    return id;
  }
}
