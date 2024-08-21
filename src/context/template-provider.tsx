"use client";

import { createContext, useContext, useState } from "react";

interface Option {
  opt_content: string;
  score: number;
}

export interface IQuestion {
  question: string;
  opts: Option[];
}

interface Subcategory {
  [subcategory: string]: IQuestion[];
}

interface Category {
  Environment: Subcategory;
  Social: Subcategory;
  Governance: Subcategory;
}

const TemplateContext = createContext<{
  templateOptions: Category | undefined;
  setTemplateOptions: React.Dispatch<
    React.SetStateAction<Category | undefined>
  >;
}>({
  templateOptions: undefined,
  setTemplateOptions: () => {},
});

export const TemplateWrappper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [templateOptions, setTemplateOptions] = useState<
    Category | undefined
  >();

  return (
    <TemplateContext.Provider value={{ templateOptions, setTemplateOptions }}>
      {children}
    </TemplateContext.Provider>
  );
};

export function useTemplateContext() {
  return useContext(TemplateContext);
}
