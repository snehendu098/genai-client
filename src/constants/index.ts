export const baseUrl = "http://127.0.0.1:8000";

type DropdownOption = {
  head?: boolean;
  name: string;
  url: string;
};

export const dropdownOptions: DropdownOption[] = [
  { head: true, name: "ESG Ai Toolbox", url: "/" },
  { name: "ESG Document Summarizer", url: "/app1" },
  { name: "ESG Questionnaire", url: "/app2" },
  { name: "ESG Governance", url: "/app3" },
  { name: "ESG Search Engine", url: "/app4" },
  { name: "Supplier Assessment", url: "/management", head: true },
  { name: "Data Management", url: "/management/data-management" },
  { name: "Data Analytics and Reporting", url: "/management/analytics" },
  { name: "Ai Module", url: "/management/ai" },
];
