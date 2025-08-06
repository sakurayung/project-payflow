import React, { useState, useMemo } from "react";
import { useForm } from "@tanstack/react-form";
import type { Employee } from "@/lib/types";
import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export const Route = createFileRoute("/employees-records")({
  component: RouteComponent,
});

function RouteComponent() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const columnHelper = createColumnHelper<Employee>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "Employee's ID",
        cell: (info) => info.getValue(),
        size: 120,
      }),
      columnHelper.accessor("employeeName", {
        header: "Employee's Name",
        cell: (info) => info.getValue(),
        size: 150,
      }),
      columnHelper.accessor("major", {
        header: "Major",
        cell: (info) => info.getValue(),
        size: 120,
      }),
      columnHelper.accessor("degree", {
        header: "Degree",
        cell: (info) => info.getValue(),
        size: 120,
      }),
      columnHelper.accessor("workTime", {
        header: "Work Time",
        cell: (info) => info.getValue(),
        size: 120,
      }),
      columnHelper.accessor("units", {
        header: "Units",
        cell: (info) => info.getValue(),
        size: 100,
      }),
      columnHelper.accessor("monthlySalary", {
        header: "Monthly Salary",
        cell: (info) => {
          const value = info.getValue();
          return typeof value === "number"
            ? `${value.toLocaleString()}`
            : value;
        },
        size: 140,
      }),
    ],
    []
  );

  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const defaultEmployee: Employee = {
    id: "",
    employeeName: "",
    major: "",
    degree: "",
    units: 0,
    workTime: "",
    monthlySalary: 0,
  };

  const form = useForm({
    defaultValues: defaultEmployee,
    onSubmit: async ({ value }: { value: Employee }) => {
      const newEmployee: Employee = {
        ...value,
        id: uuidv4(),
      };
      setEmployees((prev) => {
        const updated = [...prev, newEmployee];
        // FOR DEBUGGING
        console.log("Employees:", updated);
        return updated;
      });
      form.reset();
    },
    validators: {
      onChange: z.object({
        employeeName: z.string().min(10),
        major: z.string().min(3),
        degree: z.string().min(4),
        units: z.number().nonnegative(),
        workTime: z.string().min(8),
        monthlySalary: z.number().nonnegative(),
      }),
    },
  });

  return (
    <div className="flex-1">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="employeeName"
          children={(field) => (
            <div className="flex flex-row gap-2 items-center">
              <label htmlFor={field.name}>Employee's Name</label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-[200px]"
              />
              {field.state.meta.errors.map((error) => (
                <p key={error?.message} className="text-red-500">
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        />
        <form.Field
          name="major"
          children={(field) => (
            <div className="flex flex-row gap-2 items-center">
              <label htmlFor={field.name}>Major</label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-[200px]"
              />
              {field.state.meta.errors.map((error) => (
                <p key={error?.message} className="text-red-500">
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        />
        <form.Field
          name="degree"
          children={(field) => (
            <div className="flex flex-row gap-2 items-center">
              <label htmlFor={field.name}>Degree</label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-[200px]"
              />
              {field.state.meta.errors.map((error) => (
                <p key={error?.message} className="text-red-500">
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        />
        <form.Field
          name="units"
          children={(field) => (
            <div className="flex flex-row gap-2 items-center">
              <label htmlFor={field.name}>Units</label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                className="w-[200px]"
              />
              {field.state.meta.errors.map((error) => (
                <p key={error?.message} className="text-red-500">
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        />
        <form.Field
          name="workTime"
          children={(field) => (
            <div className="flex flex-row gap-2 items-center">
              <label htmlFor={field.name}>Work Time</label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-[200px]"
              />
              {field.state.meta.errors.map((error) => (
                <p key={error?.message} className="text-red-500">
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        />
        <form.Field
          name="monthlySalary"
          children={(field) => (
            <div className="flex flex-row gap-2 items-center">
              <label htmlFor={field.name}>Monthly Salary</label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                className="w-[200px]"
              />
              {field.state.meta.errors.map((error) => (
                <p key={error?.message} className="text-red-500">
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        />
        <Button>Submit</Button>
      </form>

      <div className="mt-8 bg-white rounded-xl overflow-hidden shadow-lg">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">
                Employee's ID
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">
                Employee's Name
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">
                Major
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">
                Degree
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">
                Work Time
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">
                Units
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">
                Monthly
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee: Employee, index: number) => (
              <tr
                key={employee.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-4 py-3 text-gray-800">{employee.id}</td>
                <td className="px-4 py-3 text-gray-800">
                  {employee.employeeName}
                </td>
                <td className="px-4 py-3 text-gray-800">{employee.major}</td>
                <td className="px-4 py-3 text-gray-800">{employee.degree}</td>
                <td className="px-4 py-3 text-gray-800">{employee.workTime}</td>
                <td className="px-4 py-3 text-gray-800">{employee.units}</td>
                <td className="px-4 py-3 text-gray-800">
                  {employee.monthlySalary}
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  No employees added yet. Add your first employee using the form
                  above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
