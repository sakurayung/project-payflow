using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project_payflow_backend.Model;

public class Employee
{
    [Key]
    public int EmployeeId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Major { get; set; } = string.Empty;
    public string Degree { get; set; } = string.Empty;
    public string Name => $"{FirstName} {LastName}";
    public int Units { get; set; }
    public double WorkHours { get; set; }
    [Column(TypeName = "decimal(10,2)")]
    public decimal MonthlySalary { get; set; }
    public bool IsActive { get; set; }
}