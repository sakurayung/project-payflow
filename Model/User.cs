using System.ComponentModel.DataAnnotations;

namespace project_payflow_backend.Model;

public class User
{
    [Key]
    public int UserId { get; set; } 
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}