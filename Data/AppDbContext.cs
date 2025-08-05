using Microsoft.EntityFrameworkCore;
using project_payflow_backend.Model;

namespace project_payflow_backend.Data;

public class AppDbContext : DbContext
{

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    { }

    public DbSet<Employee> Employees { get; set; } = null!;
    public DbSet<Payroll> Payrolls { get; set; } = null!;
    public DbSet<PayrollReceipt> PayrollReceipts { get; set; } = null!;
}


        
