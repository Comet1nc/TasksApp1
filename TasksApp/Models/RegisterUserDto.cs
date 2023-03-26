using System.ComponentModel.DataAnnotations;

namespace TasksApp.Models
{
    public class RegisterUserDto
    {
        [Required]
        [MaxLength(25)]
        public string Name { get; set; }
        [Required]
        [MinLength(5)]
        public string Password { get; set; }
    }
}
