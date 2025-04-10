using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiProyectoMySQL.Models;

namespace MiProyectoMySQL.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrdersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
    {
        return await _context.Orders
        .Include(o => o.ProductLines)
        .ThenInclude(pl => pl.Product)
        .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrderId(int id)
    {
        var order = await _context.Orders
        .Include(o => o.ProductLines)
        .ThenInclude(pl => pl.Product)
        .FirstOrDefaultAsync(o => o.Id == id);
        return order == null ? NotFound("Pedido no encontrado") : order;
    }

    [HttpPost]
    public async Task<ActionResult<Order>> PostOrder(OrderInsert orderInsert)
    {
        var order = new Order
        {
            Date = orderInsert.Date,
            ClientId = orderInsert.ClientId
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrderId), new { id = order.Id }, order);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Order>> PutOrderId(int id, OrderInsert orderInsert)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null)
        {
            return NotFound("Pedido no encontrado");
        }

        var client = await _context.Clients.FindAsync(orderInsert.ClientId);
        if (client == null)
        {
            return NotFound("Cliente no encontrado");
        }
        order.Date = orderInsert.Date;
        order.ClientId = orderInsert.ClientId;

        await _context.SaveChangesAsync();

        return order;
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Order>> DeleteOrderId(int id)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null)
        {
            return NotFound("Pedido no encontrado");
        }

        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Pedido eliminado" });
    }

}