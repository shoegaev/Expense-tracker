import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import "./App.scss";
import Layout from "./components/Layout";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import HistoryPage from "./pages/HistoryPage";
import DiagramPage from "./pages/DiagramPage";
import NotFoundPage from "./pages/NotFoundPage";
import AppState from "./types/appStateType";

const LOCAL_STORAGE_KEY = "expenseTrackerApp";

function App() {
  const [appState, setAppState] = useState<null | AppState>(null);

  if (appState === null) {
    const localStorageItem = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localStorageItem) {
      setAppState(JSON.parse(localStorageItem))
    }
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HistoryPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="category" element={<CategoriesPage />} />
          <Route path="diagram" element={<DiagramPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
