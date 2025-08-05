using System;

namespace project_payflow_backend.DTO;

public class PayrollDTO
{
    public int PayrollId { get; set; }
    public int EmployeeId { get; set; }
    public DateTime PayPeriodStart { get; set; }
    public DateTime PayPeriodEnd { get; set; }
    public DateTime PaymentDate { get; set; }
    
    public int AvailableLeaves { get; set; }
    public decimal LateHours { get; set; }
    public int DaysAbsent { get; set; }
    
    public decimal PagIbig { get; set; }
    public decimal SSS { get; set; }
    public decimal PhilHealth { get; set; }
    public decimal Tax { get; set; }
    
    public decimal AbsenceDeduction { get; set; }
    public decimal LatesDeduction { get; set; }
    
    public int OverloadUnits { get; set; }
    public decimal OverloadAmount { get; set; }
    
    public decimal FirstHalfPay { get; set; }
    public decimal SecondHalfPay { get; set; }
    
    public decimal GrossPay { get; set; }
    public decimal TotalDeductions { get; set; }
    public decimal NetPay { get; set; }
}