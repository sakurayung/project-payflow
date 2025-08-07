import api from "@/api/axios/route";
import type { Employee, EmployeeFormValues } from "@/types";

export const employeeApi = {
  // GET ALL EMPLOYEES
  getAll: async (): Promise<Employee[]> => {
    const response = await api.get<Employee[]>("/api/Employee");
    return response.data;
  },

  // GET EMPLOYEE BY ID
  getById: async (id: number): Promise<Employee> => {
    const response = await api.get<Employee>(`/api/Employee/${id}`);
    return response.data;
  },

  // CREATE NEW EMPLOYEE
  createEmployee: async (
    employeeData: EmployeeFormValues
  ): Promise<Employee> => {
    const response = await api.post<Employee>("/api/Employee", employeeData);
    return response.data;
  },

  // UPDATE EMPLOYEE
  updateEmployee: async (id: number, employeeData: Partial<Employee>) => {
    const response = await api.put<Employee>(
      `/api/Employee/${id}`,
      employeeData
    );
    return response.data;
  },

  // DELETE EMPLOYEE
  deleteEmployee: async (id: number): Promise<void> => {
    await api.delete(`/api/Employee/${id}`);
  },
};
