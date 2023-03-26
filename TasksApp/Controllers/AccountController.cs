using Microsoft.AspNetCore.Mvc;
using TasksApp.Models;
using TasksApp.Services;

namespace TasksApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("register")]
        public ActionResult RegisterUser([FromBody]RegisterUserDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var registered = _accountService.RegisterUser(dto);

            if(registered)
            {
                return Ok();
            }

            return BadRequest("Name already exist");
        }

        [HttpPost("login")]
        public ActionResult Login([FromBody]LoginDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string token = _accountService.GenerateJwt(dto);

            if(token is null)
            {
                return BadRequest();
            }

            return Ok(token);
        }
    }
}
