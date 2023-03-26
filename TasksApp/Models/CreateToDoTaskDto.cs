namespace TasksApp.Models
{
    public class CreateToDoTaskDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
    }
}
