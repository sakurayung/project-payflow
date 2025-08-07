namespace project_payflow_backend.DTO;

public class UserDTO
{
    public int UserId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}