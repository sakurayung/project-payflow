namespace project_payflow_backend.DTO;

public class EmployeeDTO
{
    public int EmployeeId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Major { get; set; } = string.Empty;
    public string Degree { get; set; } = string.Empty;
    public int Units { get; set; }
    public double WorkHours { get; set; }
    public decimal MonthlySalary { get; set; }
    public bool IsActive { get; set; }
}