import React, { useState } from "react";

import { useForm } from "@tanstack/react-form";

import type { Employee } from "@/lib/types";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employees-records")({
  component: RouteComponent,
});

function RouteComponent() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchId, setSearchId] = useState<string>("");

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      major: "",
      degree: "",
      employeeName: "",
      units: "",
      workTime: "",
      monthlySalary: "",
    },
    onSubmit: async ({ value }: { value: Employee }) => {
      const newEmployee: Employee = {
        /** TODO: implement UUID for this, this is claude.ai code */
        id: Date.now().toString(),
        ...value,
      };
      setEmployees((prev) => [...prev, newEmployee]);
      form.reset();
    },
  });

  const handleReset = (): void => {
    form.reset();
  };

  const handleUpdate = (): void => {
    if (searchId) {
      const employee = employees.find((emp) => emp.id === searchId);
      if (employee) {
        form.setFieldValue("firstName", employee.firstName);
        form.setFieldValue("lastName", employee.lastName);
        form.setFieldValue("major", employee.major);
        form.setFieldValue("degree", employee.degree);
        form.setFieldValue("employeeName", employee.employeeName);
        form.setFieldValue("units", employee.units);
        form.setFieldValue("workTime", employee.workTime);
        form.setFieldValue("monthlySalary", employee.monthlySalary);
      }
    }
  };

  const handleDelete = (): void => {
    if (searchId) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== searchId));
      setSearchId("");
    }
  };

  const handleSearch = (): void => {
    const employee = employees.find((emp) => emp.id === searchId);
    if (employee) {
      form.setFieldValue("firstName", employee.firstName);
      form.setFieldValue("lastName", employee.lastName);
      form.setFieldValue("major", employee.major);
      form.setFieldValue("degree", employee.degree);
      form.setFieldValue("employeeName", employee.employeeName);
      form.setFieldValue("units", employee.units);
      form.setFieldValue("workTime", employee.workTime);
      form.setFieldValue("monthlySalary", employee.monthlySalary);
    }
  };

  const handleSearchIdChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchId(e.target.value);
  };

  return (
    <div className="flex-1">
      <div className="bg-blue-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-8">
          Employee's Information
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-4">
              <form.Field name="firstName">
                {(field) => (
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      First Name:
                    </label>
                    <input
                      type="text"
                      value={field.state.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        field.handleChange(e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="lastName">
                {(field) => (
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      value={field.state.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        field.handleChange(e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="major">
                {(field) => (
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Major:
                    </label>
                    <input
                      type="text"
                      value={field.state.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        field.handleChange(e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="degree">
                {(field) => (
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Degree:
                    </label>
                    <input
                      type="text"
                      value={field.state.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        field.handleChange(e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="employeeName">
                {(field) => (
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Employee's Name:
                    </label>
                    <input
                      type="text"
                      value={field.state.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        field.handleChange(e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                )}
              </form.Field>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <form.Field name="units">
                {(field) => (
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Units:
                    </label>
                    <input
                      type="text"
                      value={field.state.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        field.handleChange(e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="workTime">
                {(field) => (
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Work Time:
                    </label>
                    <input
                      type="text"
                      value={field.state.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        field.handleChange(e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="monthlySalary">
                {(field) => (
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Monthly Salary:
                    </label>
                    <input
                      type="text"
                      value={field.state.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        field.handleChange(e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                )}
              </form.Field>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-6">
            <button
              type="button"
              onClick={handleReset}
              className="px-8 py-3 bg-gray-500 text-white rounded-full font-semibold hover:bg-gray-600 transition-colors duration-200 shadow-lg"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="px-8 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors duration-200 shadow-lg"
            >
              Add
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-8 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors duration-200 shadow-lg"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-blue-600">
          <label className="text-white font-semibold">Employee's ID:</label>
          <input
            type="text"
            value={searchId}
            onChange={handleSearchIdChange}
            className="px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-white text-blue-800 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
          >
            Enter
          </button>
        </div>

        {/* Employee Table */}
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
                  <td className="px-4 py-3 text-gray-800">
                    {employee.workTime}
                  </td>
                  <td className="px-4 py-3 text-gray-800">{employee.units}</td>
                  <td className="px-4 py-3 text-gray-800">
                    {employee.monthlySalary}
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No employees added yet. Add your first employee using the
                    form above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
