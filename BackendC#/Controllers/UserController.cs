using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiProyectoMySQL.Models;

namespace MiProyectoMySQL.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly AppDbContext _context;

    public UserController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUserId(int id)
    {
        var user = await _context.Users.FindAsync(id);
        return user == null ? NotFound("Usuario no encontrado") : user;
    }

    [HttpPost]
    public async Task<ActionResult<User>> PostUser(UserInsert userInsert)
    {
        var user = new User
        {
            Name = userInsert.Name,
            Password = userInsert.Password
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUserId), new { id = user.Id }, user);
    }


    [HttpDelete("{id}")]
    public async Task<ActionResult<User>> DeleteUserId(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound("Usuario no encontrado");
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Usuario eliminado" });
    }
}