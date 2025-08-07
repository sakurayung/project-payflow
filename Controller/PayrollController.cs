using Microsoft.AspNetCore.Mvc;
using project_payflow_backend.Data;

namespace project_payflow_backend.Controller;

public class PayrollController : ControllerBase
{
    private readonly AppDbContext _context;

    public PayrollController(AppDbContext context)
    {
        _context = context;
    }
    
    // GET: api/payroll
    
    // POST: api/payroll
}