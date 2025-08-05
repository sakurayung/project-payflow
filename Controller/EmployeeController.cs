using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project_payflow_backend.Data;
using project_payflow_backend.DTO;
using project_payflow_backend.Model;

namespace project_payflow_backend.Controller;

[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly AppDbContext _context;
    
    public EmployeeController(AppDbContext context)
    {
        _context = context;
    }
    
    
    // GET: api/employee
    [HttpGet]
    public async Task<ActionResult<EmployeeDTO>> GetAllEmployees()
    {
        try
        {
            var employees = await _context.Employees.Select(e => new EmployeeDTO
            {
                EmployeeId = e.EmployeeId,
                FirstName = e.FirstName,
                LastName = e.LastName,
                Major = e.Major,
                Degree = e.Degree,
                Units = e.Units,
                WorkHours = e.WorkHours,
                MonthlySalary = e.MonthlySalary,
                IsActive = e.IsActive
            }).ToListAsync();

            return Ok(employees);
        } catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    
    // GET: api/employee/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<EmployeeDTO>> GetEmployeeById(int id)
    {
        var employees = await _context.Employees.FindAsync(id);

        if (employees == null)
        {
            return NotFound();
        }

        return Ok(employees);
    }
    
    // POST: api/employee
    [HttpPost]
    public async Task<ActionResult<EmployeeDTO>> CreateEmployee(EmployeeDTO employeeDto)
    {
        if (employeeDto == null)
        {
            return BadRequest("Employee data is null.");
        }

        var employee = new Employee
        {
            FirstName = employeeDto.FirstName,
            LastName = employeeDto.LastName,
            Major = employeeDto.Major,
            Degree = employeeDto.Degree,
            Units = employeeDto.Units,
            WorkHours = employeeDto.WorkHours,
            MonthlySalary = employeeDto.MonthlySalary,
            IsActive = employeeDto.IsActive
        };

        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.EmployeeId }, MapToDto(employee));
    }
    
    // PUT: api/employee/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmployee(int id, EmployeeDTO employeeDto)
    {
        if (id != employeeDto.EmployeeId)
        {
            return BadRequest("Employee ID mismatch.");
        }

        var employee = await _context.Employees.FindAsync(id);
        if (employee == null)
        {
            return NotFound();
        }

        employee.FirstName = employeeDto.FirstName;
        employee.LastName = employeeDto.LastName;
        employee.Major = employeeDto.Major;
        employee.Degree = employeeDto.Degree;
        employee.Units = employeeDto.Units;
        employee.WorkHours = employeeDto.WorkHours;
        employee.MonthlySalary = employeeDto.MonthlySalary;
        employee.IsActive = employeeDto.IsActive;

        _context.Entry(employee).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!EmployeeExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }
    
    // DELETE: api/employee/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(int id)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null)
        {
            return NotFound();
        }

        _context.Employees.Remove(employee);
        await _context.SaveChangesAsync();

        return NoContent();
    }
    
    private bool EmployeeExists(int id)
    {
        return _context.Employees.Any(e => e.EmployeeId == id);
    }
    
    private static EmployeeDTO MapToDto(Employee employee)
    {
        return new EmployeeDTO
        {
            EmployeeId = employee.EmployeeId,
            FirstName = employee.FirstName,
            LastName = employee.LastName,
            Major = employee.Major,
            Degree = employee.Degree,
            Units = employee.Units,
            WorkHours = employee.WorkHours,
            MonthlySalary = employee.MonthlySalary,
            IsActive = employee.IsActive
        };
    }
    
}