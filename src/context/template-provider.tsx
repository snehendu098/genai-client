"use client";

import React, { createContext, useContext, useState } from "react";

const TemplateContext = createContext<any>(undefined);

interface Answer {
  answer: string;
  score: number;
}

interface Question {
  title: string;
  answer: Answer[];
}

interface ITemplateOption {
  [key: string]: Question[];
}

export const TemplateWrappper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [templateOptions, setTemplateOptions] = useState<ITemplateOption>({});

  return (
    <TemplateContext.Provider value={{ templateOptions, setTemplateOptions }}>
      {children}
    </TemplateContext.Provider>
  );
};

export function usePageContext() {
  return useContext(TemplateContext);
}
