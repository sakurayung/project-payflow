import { History, HandCoins, NotebookPen, Home } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";

import { Link } from "@tanstack/react-router";

const links = [
  {
    to: "/",
    label: "Dashboard",
    icon: Home,
  },
  {
    to: "/payroll",
    label: "Payroll",
    icon: HandCoins,
  },
  {
    to: "/employees-records",
    label: "Employees Records",
    icon: NotebookPen,
  },
  {
    to: "/transaction-history",
    label: "Transaction History",
    icon: History,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="">
      <SidebarContent className="justify-center gap-8 px-8">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex flex-row gap-x-2 items-center"
          >
            <link.icon size={24} /> {link.label}
          </Link>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
