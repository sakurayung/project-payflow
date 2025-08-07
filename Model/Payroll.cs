using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project_payflow_backend.Model;

public class Payroll
{
    [Key]
    public Guid PayrollId { get; set; }
    public int EmployeeId { get; set; }
    [ForeignKey("EmployeeId")]
    public Employee Employee { get; set; } = null!;
    public DateTime PayPeriodStart { get; set; }
    public DateTime PayPeriodEnd { get; set; }
    public DateTime PaymentDate { get; set; }
    
    public int AvailableLeaves { get; set; }
    
    [Column(TypeName = "decimal(10,2)")]
    public decimal LateHours { get; set; }
    public int DaysAbsent { get; set; }
    
    [Column(TypeName = "decimal(10,2)")]
    public decimal PagIbig { get; set; }
    [Column(TypeName = "decimal(10,2)")]
    public decimal SSS { get; set; }
    [Column(TypeName = "decimal(10,2)")]
    public decimal PhilHealth { get; set; }
    [Column(TypeName = "decimal(10,2)")]
    public decimal Tax { get; set; }
    
    [Column(TypeName = "decimal(10,2)")]
    public decimal AbsenceDeduction { get; set; }
    [Column(TypeName = "decimal(10,2)")]
    public decimal LatesDeduction { get; set; }
    
    public int OverloadUnits { get; set; }
    [Column(TypeName = "decimal(10,2)")]
    public decimal OverloadAmount { get; set; }
    
    // Split payments
    [Column(TypeName = "decimal(10,2)")]
    public decimal FirstHalfPay { get; set; }
    [Column(TypeName = "decimal(10,2)")]// 15th
    public decimal SecondHalfPay { get; set; } // 30th
    
    // Totals
    [Column(TypeName = "decimal(10,2)")]
    public decimal GrossPay { get; set; }
    [Column(TypeName = "decimal(10,2)")]
    public decimal TotalDeductions { get; set; }
    [Column(TypeName = "decimal(10,2)")]
    public decimal NetPay { get; set; }
}