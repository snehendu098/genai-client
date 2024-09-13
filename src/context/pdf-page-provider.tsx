"use client";

import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(undefined);

interface AnalyticsData {
  [type: number]: number;
}

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState<number>(0);
  const [handleDataContext, setHandleDataContext] = useState<AnalyticsData>();

  return (
    <AppContext.Provider
      value={{ page, setPage, handleDataContext, setHandleDataContext }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
