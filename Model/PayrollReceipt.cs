namespace project_payflow_backend.Model;

public class PayrollReceipt
{
    
    public int ReceiptId { get; set; }
    public int PayrollId { get; set; }
    public Payroll Payroll { get; set; } = null!;
    public DateTime GeneratedDate { get; set; }
    public string ReceiptNumber { get; set; } = string.Empty;

    public string ReceiptJson { get; set; } = string.Empty;
    
    // Optional: URL to download the receipt
    public string PrintableReceiptUrl { get; set; } = string.Empty;
}