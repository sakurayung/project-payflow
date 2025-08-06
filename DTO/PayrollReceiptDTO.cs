using System;

namespace project_payflow_backend.DTO;

public class PayrollReceiptDTO
{
    public int ReceiptId { get; set; }
    public int PayrollId { get; set; }
    public DateTime GeneratedDate { get; set; }
    public string ReceiptNumber { get; set; } = string.Empty;
    public string ReceiptJson { get; set; } = string.Empty;
    public string PrintableReceiptUrl { get; set; } = string.Empty;
}