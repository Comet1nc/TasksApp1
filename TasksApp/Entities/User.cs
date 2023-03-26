using System.ComponentModel.DataAnnotations;

namespace TasksApp.Entities
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(25)]
        public string Name { get; set; }
        [Required]
        public string Password { get; set; }

        //public virtual List<ToDoTask> Tasks { get; set; }
    }
}
