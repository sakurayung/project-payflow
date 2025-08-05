namespace project_payflow_backend.Model;

public class Payroll
{
    public int PayrollId { get; set; }
    public int EmployeeId { get; set; }
    public Employee Employee { get; set; } = null!;
    public DateTime PayPeriodStart { get; set; }
    public DateTime PayPeriodEnd { get; set; }
    public DateTime PaymentDate { get; set; }
    
    // Attendance metrics
    public int AvailableLeaves { get; set; }
    public decimal LateHours { get; set; }
    public int DaysAbsent { get; set; }
    
    // Standard deductions
    public decimal PagIbig { get; set; }
    public decimal SSS { get; set; }
    public decimal PhilHealth { get; set; }
    public decimal Tax { get; set; }
    
    // Calculated deductions
    public decimal AbsenceDeduction { get; set; }
    public decimal LatesDeduction { get; set; }
    
    // Additional earnings
    public int OverloadUnits { get; set; }
    public decimal OverloadAmount { get; set; }
    
    // Split payments
    public decimal FirstHalfPay { get; set; } // 15th
    public decimal SecondHalfPay { get; set; } // 30th
    
    // Totals
    public decimal GrossPay { get; set; }
    public decimal TotalDeductions { get; set; }
    public decimal NetPay { get; set; }
}