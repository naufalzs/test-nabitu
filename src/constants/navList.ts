interface NavItem {
  name: string;
  route: string;
  icon: string;
}

export const ROUTES = {
  INVOICES: {
    ADD: "/invoices/add",
    LIST: "/invoices/list",
  },
};

export const NAV_ITEMS: NavItem[] = [
  {
    name: "Add Invoice",
    route: ROUTES.INVOICES.ADD,
    icon: "",
  },
  {
    name: "My Invoices",
    route: ROUTES.INVOICES.LIST,
    icon: "",
  },
] as const;
