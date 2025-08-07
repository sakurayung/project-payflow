using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using project_payflow_backend.Data;
using project_payflow_backend.DTO;
using project_payflow_backend.Model;

namespace project_payflow_backend.Controller;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public UserController(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthDTO.LoginResponse>> Login(AuthDTO.LoginRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var loginRequest = new AuthDTO.LoginRequest
            {
                Username = request.Username,
                Password = request.Password
            };

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == loginRequest.Username && u.Password == loginRequest.Password);


            if (user == null)
            {
                return Unauthorized("Invalid username or password");
            }

            // In production, use proper password hashing
            if (user.Password != request.Password)
            {
                return Unauthorized("Invalid username or password");
            }

            var token = GenerateJwtToken(user);


            return Ok(new AuthDTO.LoginResponse
            {
                Token = token,
                UserId = user.UserId,
                Username = user.Username,
            });
        }
        catch (Exception ex)
        {
            throw new Exception("An error occurred while processing the login request.", ex);
        }
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthDTO.RegisterResponse>> Register(AuthDTO.RegisterRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        try
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == request.Username);
            
            var errors = new List<string>();
            
            if (existingUser != null)
            {
                errors.Add("Username already exists.");
            }

            if (request.Password != request.ConfirmPassword)
            {
               throw new ArgumentException("Passwords do not match.");
            }
            
            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
                errors.Add("Username and password cannot be empty.");
            
            var user = new User
            {
                Username = request.Username,
                Password = request.Password,
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();


            return Ok(new AuthDTO.RegisterResponse
            {
                UserId = user.UserId,
                Username = user.Username,
                Message = "Registration successful."
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    
    private string GenerateJwtToken(User user)
    {
        var securityKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? "fallbackSecretKey123456789012345678901234"));
        
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
