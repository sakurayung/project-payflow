import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/payroll", label: "Payroll" },
    { to: "/employees-records", label: "Employees Records" },
    { to: "/transaction-history", label: "Transaction History" },
  ];

  return (
    // <div>
    //   <div className="flex flex-row items-center justify-between px-2 py-1">
    //     <nav className="flex gap-4 text-lg">
    //       {links.map(({ to, label }) => {
    //         return (
    //           <Link key={to} to={to}>
    //             {label}
    //           </Link>
    //         );
    //       })}
    //     </nav>
    //     <div className="flex items-center gap-2">
    //       <ModeToggle />
    //     </div>
    //   </div>
    //   <hr />
    // </div>
    <nav className="flex flex-col border-white">
      {links.map(({ to, label }) => {
        return (
          <Link key={to} to={to}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
