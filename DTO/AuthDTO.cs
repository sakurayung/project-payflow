using System.ComponentModel.DataAnnotations;

namespace project_payflow_backend.DTO;

public class AuthDTO
{
    public class LoginRequest
    {
        [Required] public string Username { get; set; } = string.Empty;
        [Required] [MinLength(6)] public string Password { get; set; } = string.Empty;
    }

    public class LoginResponse
    {
        public string Token { get; set; } = string.Empty;
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
    }
    
    public class RegisterRequest
    {
        [Required] public string Username { get; set; } = string.Empty;
        [Required] [MinLength(6)] public string Password { get; set; } = string.Empty;
        [Required] public string ConfirmPassword { get; set; } = string.Empty;
    }
    
    public class RegisterResponse
    {
        public string Message { get; set; } = string.Empty;
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
    }
}