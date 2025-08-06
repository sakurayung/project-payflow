import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import type { Employee } from "@/lib/types";
import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";

export const Route = createFileRoute("/employees-records")({
  component: RouteComponent,
});

function RouteComponent() {
  const [employees, setEmployees] = useState<Employee[]>([]);

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
    </div>
  );
}
