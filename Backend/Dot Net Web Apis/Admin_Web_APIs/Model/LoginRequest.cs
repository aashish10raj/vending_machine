using System.ComponentModel.DataAnnotations;

namespace Admin_Web_APIs.Model
{
    public class LoginRequest
    {
        [EmailAddress]
        public string? Email { get; set; }

        public string? Password { get; set; }
    }
}
