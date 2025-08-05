using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project_payflow_backend.Model;

public class PayrollReceipt
{
    [Key]
    public int ReceiptId { get; set; }
    public int PayrollId { get; set; }
    [ForeignKey("PayrollId")]
    public Payroll Payroll { get; set; } = null!;
    public DateTime GeneratedDate { get; set; }
    public string ReceiptNumber { get; set; } = string.Empty;

    public string ReceiptJson { get; set; } = string.Empty;
    
    // Optional: URL to download the receipt
    public string PrintableReceiptUrl { get; set; } = string.Empty;
}