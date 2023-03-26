using System.ComponentModel.DataAnnotations;

namespace TasksApp.Models
{
    public class LoginDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
