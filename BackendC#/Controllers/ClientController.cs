using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiProyectoMySQL.Models;

namespace ClientController.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientController : ControllerBase
{
    private readonly AppDbContext _context;

    public ClientController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Client>>> GetClients()
    {
        return await _context.Clients
        .Include(c => c.Orders)
            .ThenInclude(o => o.ProductLines)
        .ToListAsync();

    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Client>> GetClientId(int id)
    {
        var client = await _context.Clients
        .Include(c => c.Orders)
            .ThenInclude(o => o.ProductLines)
        .FirstOrDefaultAsync(c => c.Id == id);
        return client == null ? NotFound("Cliente no encontrado") : client;
    }

    [HttpPost]
    public async Task<ActionResult<Client>> PostClient(ClientInsert clientInsert)
    {
        var client = new Client
        {
            Name = clientInsert.Name,
            Credit = clientInsert.Credit,
        };

        _context.Clients.Add(client);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetClientId), new { id = client.Id }, client);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Client>> PutClientId(int id, ClientInsert clientInsert)
    {
        var client = await _context.Clients.FindAsync(id);
        if (client == null)
        {
            return NotFound("Cliente no encontrado");
        }

        client.Name = clientInsert.Name;
        client.Credit = clientInsert.Credit;

        await _context.SaveChangesAsync();

        return client;
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Client>> DeleteClientId(int id)
    {
        var client = await _context.Clients.FindAsync(id);
        if (client == null)
        {
            return NotFound("Cliente no encontrado");
        }

        _context.Clients.Remove(client);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Cliente eliminado" });
    }
}