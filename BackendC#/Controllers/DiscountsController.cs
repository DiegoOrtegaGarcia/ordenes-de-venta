using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiProyectoMySQL.Models;
namespace DiscountsController.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DiscountsController : ControllerBase
{
    private readonly AppDbContext _context;

    public DiscountsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Discount>>> GetDiscounts()
    {
        return await _context.Discounts.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Discount>> GetDiscountId(int id)
    {
        var discount = await _context.Discounts.FindAsync(id);
        return discount == null ? NotFound("Descuento no encontrado") : discount;
    }

    [HttpPost]
    public async Task<ActionResult<Discount>> PostDiscount(DiscountInsert discountinsert)
    {
        var discount = new Discount
        {
            ValidFrom = discountinsert.ValidFrom,
            ValidTo = discountinsert.ValidTo,
            Value = discountinsert.Value,
            IsPercentage = discountinsert.IsPercentage
        };

        _context.Discounts.Add(discount);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetDiscountId), new { id = discount.Id }, discount);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Discount>> PutDiscountId(int id, DiscountInsert discountinsert)
    {
        var discount = await _context.Discounts.FindAsync(id);
        if (discount == null)
        {
            return NotFound("Descuento no encontrado");
        }

        discount.ValidFrom = discountinsert.ValidFrom;
        discount.ValidTo = discountinsert.ValidTo;
        discount.Value = discountinsert.Value;
        discount.IsPercentage = discountinsert.IsPercentage;

        await _context.SaveChangesAsync();

        return discount;
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Discount>> DeleteDiscountId(int id)
    {
        var discount = await _context.Discounts.FindAsync(id);
        if (discount == null)
        {
            return NotFound("Descuento no encontrado");
        }

        _context.Discounts.Remove(discount);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Descuento eliminado" });
    }
}