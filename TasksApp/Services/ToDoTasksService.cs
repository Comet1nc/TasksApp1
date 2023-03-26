
using Microsoft.IdentityModel.Tokens;
using TasksApp.Entities;
using TasksApp.Models;

namespace TasksApp.Services
{
    public interface IToDoTasksService
    {
        void Create(CreateToDoTaskDto dto);
        IEnumerable<ToDoTask> GetAll();
        public bool Delete(int id);
        public bool Update(UpdateToDoTaskDto dto, int id);

    }

    public class ToDoTasksService : IToDoTasksService
    {
        private readonly TaskDbContext _dbContext;

        public ToDoTasksService(TaskDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<ToDoTask> GetAll()
        {
            var isNull = _dbContext.Tasks.IsNullOrEmpty();
            if (isNull)
            {
                return null;
            }
            var tasks = _dbContext.Tasks.ToList();

            return tasks;
        }

        public void Create(CreateToDoTaskDto dto)
        {

            var task = new ToDoTask()
            {
                Name = dto.Name,
                Description = dto.Description,
                IsCompleted = dto.IsCompleted,
            };

            _dbContext.Add(task);
            _dbContext.SaveChanges();
        }

        public bool Delete(int id)
        {
            var task = _dbContext.Tasks.FirstOrDefault(t => t.Id == id);

            if (task is null)
            {
                return false;
            }

            _dbContext.Tasks.Remove(task);
            _dbContext.SaveChanges();

            return true;
        }

        public bool Update(UpdateToDoTaskDto dto, int id) 
        {
            var task = _dbContext.Tasks.FirstOrDefault(t => t.Id == id);

            if (task is null)
            {
                return false;
            }

            task.Name = dto.Name;
            task.Description = dto.Description;
            task.IsCompleted = dto.IsCompleted;

            _dbContext.SaveChanges();

            return true;
        }
    }
}
