using Microsoft.EntityFrameworkCore;

namespace TasksApp.Entities
{
    public class TaskDbContext : DbContext
    {
        // Server=sql_server2022;Database=TasksDb;Trusted_Connection=True;MultipleActiveResultSets=true
        private string _connetctionString =
            "mcr.microsoft.com/mssql/server:2022-latest";
        public DbSet<User> Users { get; set; }
        public DbSet<ToDoTask> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(u => u.Name)
                .IsRequired()
                .HasMaxLength(25);

            modelBuilder.Entity<User>()
                .Property(u => u.Password)
                .IsRequired();

            modelBuilder.Entity<ToDoTask>()
                .Property(t => t.Name)
                .IsRequired();

            modelBuilder.Entity<User>().HasData(
                    new User()
                    {
                        Id = 2,
                        Name = "admin",
                        Password = "admin"
                    }
                );
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseLazyLoadingProxies()
                .UseSqlServer(_connetctionString);
        }
    }
}
