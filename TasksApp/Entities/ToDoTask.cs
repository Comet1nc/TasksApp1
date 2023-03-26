using System.ComponentModel.DataAnnotations;

namespace TasksApp.Entities
{
    public class ToDoTask
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }

        //public int UserId { get; set; }
        //public virtual User User { get; set; }
    }
}
