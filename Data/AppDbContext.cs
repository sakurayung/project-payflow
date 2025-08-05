using Microsoft.EntityFrameworkCore;
using project_payflow_backend.Model;

namespace project_payflow_backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Employee> Employees { get; set; } = null!;
    public DbSet<Payroll> Payrolls { get; set; } = null!;
    public DbSet<PayrollReceipt> PayrollReceipts { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Payroll relationship with Employee one-to-many
        modelBuilder.Entity<Payroll>()
            .HasOne(p => p.Employee)
            .WithMany()
            .HasForeignKey(p => p.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);
        
        // PayrollReceipt relationship with Payroll one-to-many
        modelBuilder.Entity<PayrollReceipt>()
            .HasOne(pr => pr.Payroll)
            .WithOne()
            .HasForeignKey<PayrollReceipt>(pr => pr.PayrollId)
            .OnDelete(DeleteBehavior.Cascade);

    }
}