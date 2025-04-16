import {Navigate, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import "./App.scss";
import Layout from "./components/Layout";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import HistoryPage from "./pages/HistoryPage";
import DiagramPage from "./pages/DiagramPage";
import NotFoundPage from "./pages/NotFoundPage";
import {AppData, Expense} from "./types/appDataType";
import {AppDataHandler} from "./data/AppDataHandler";

const LOCAL_STORAGE_KEY = "expenseTrackerApp";
// localStorage.removeItem("expenseTrackerApp");

const localStorageItem = localStorage.getItem(LOCAL_STORAGE_KEY);
const dataHandler = localStorageItem
  ? new AppDataHandler(JSON.parse(localStorageItem))
  : new AppDataHandler();
function App() {
  const [appDataState, setAppDataState] = useState<AppData>(
    dataHandler.getAppData(),
  );
  const beforeUnloadHandler = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appDataState));
  };
  useEffect(() => {
    window.addEventListener("beforeunload", beforeUnloadHandler);
    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  });

  const addExpense = (
    params: Expense,
  ): true | "Invalid Date" | "Invalid category" => {
    const result = dataHandler.addExpense(params);
    if (typeof result !== "string") {
      setAppDataState(dataHandler.getAppData());
    }
    return result;
  };

  const historyPage = (
    <HistoryPage
      appDataState={appDataState}
      addExpense={addExpense}></HistoryPage>
  );
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="history" />} />
          <Route path="history" element={historyPage} />
          <Route path="category" element={<CategoriesPage />} />
          <Route path="diagram" element={<DiagramPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
