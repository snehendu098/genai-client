export interface Menu {
  name: string;
  url: string;
}

export const managementMenu: Menu[] = [
  { name: "Home", url: "" },
  { name: "Suppliers", url: "/suppliers" },
  { name: "Templates", url: "/templates" },
];

export const analyticsMenu: Menu[] = [
  { name: "Home", url: "" },
  { name: "Responses", url: "/responses" },
];
