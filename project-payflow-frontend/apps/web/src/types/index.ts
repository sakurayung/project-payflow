export interface Employee {
  id: string;
  major: string;
  degree: string;
  employeeName: string;
  units: number;
  workHours: number;
  monthlySalary: number;
}

export interface EmployeeDTO extends Employee {
  id?: string;
  major: string;
  degree: string;
  employeeName: string;
  units: number;
  workHours: number;
  monthlySalary: number;
}
export interface EmployeeFormValues {
  employeeName: string;
  degree: string;
  major: string;
  units: number;
  workHours: number;
  monthlySalary: number;
}
