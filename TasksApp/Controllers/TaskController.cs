using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using TasksApp.Entities;
using TasksApp.Models;
using TasksApp.Services;

namespace TasksApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly IToDoTasksService _taskService;

        public TaskController(IToDoTasksService taskService ) 
        {
            _taskService = taskService;
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult<IEnumerable<ToDoTask>> GetAll()
        {
            var tasks = _taskService.GetAll();

            if(tasks is null)
            {
                return NotFound("Not found");
            }

            return Ok(tasks);
        }

        [HttpPost]
        public ActionResult CreateToDoTask([FromBody]CreateToDoTaskDto dto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _taskService.Create(dto);
            
            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteTask([FromRoute]int id)
        {
            var isDeleted = _taskService.Delete(id);

            if (isDeleted)
            {
                return Ok();
            } 
            else
            {
                return NotFound();
            }
        }

        [HttpPut("{id}")]
        public ActionResult Update([FromBody]UpdateToDoTaskDto dto, [FromRoute]int id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var isUpdated = _taskService.Update(dto, id);

            if (isUpdated)
            {
                return Ok();
            }

            return NotFound();
            
        }
    }
}
