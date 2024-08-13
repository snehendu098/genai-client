"use client";

import React, { createContext, useContext, useState } from "react";

const PageContext = createContext<any>(undefined);

export const PageAppWrappper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [page, setPage] = useState<number>(0);

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
};

export function usePageContext() {
  return useContext(PageContext);
}
