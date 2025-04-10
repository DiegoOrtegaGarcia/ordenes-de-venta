using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiProyectoMySQL.Models;

namespace ProductsLine.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsLineController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsLineController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductLine>>> GetProductLines()
    {
        return await _context.ProductLines
        .Include(pl => pl.Product)    // Incluye el Producto relacionado
        .Include(pl => pl.Discount)   // Incluye el Descuento relacionado
        .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductLine>> GetProductLineId(int id)
    {
        var productLine = await _context.ProductLines
       .Include(pl => pl.Product)
       .Include(pl => pl.Discount)
       .FirstOrDefaultAsync(pl => pl.Id == id);

        return productLine == null ? NotFound("Linea de Producto no encontrada") : productLine;
    }

    [HttpPost]
    public async Task<ActionResult<ProductLine>> PostProductLine(ProductLineInsert productLineInsert)
    {
        // 1. Validar que exista el Order
        var order = await _context.Orders.FindAsync(productLineInsert.OrderId);
        if (order == null)
        {
            return NotFound("El pedido no existe");
        }

        // 2. Validar que exista el Product
        var product = await _context.Products.FindAsync(productLineInsert.ProductId);
        if (product == null)
        {
            return NotFound("Producto no encontrado");
        }

        // 3. Validar el Discount (si se proporciona un DiscountId)
        Discount? discount = null;
        if (productLineInsert.DiscountId.HasValue)
        {
            discount = await _context.Discounts.FindAsync(productLineInsert.DiscountId.Value);
            if (discount == null)
            {
                return NotFound("Descuento no encontrado");
            }
        }

        // 4. Calcular el precio final
        decimal finalPrice = ProductLine.CalculateFinalPrice(product.Price, discount);

        // 5. Calcular el valor del descuento


        // 5. Crear el ProductLine
        var productLine = new ProductLine
        {
            OrderId = productLineInsert.OrderId,
            ProductId = productLineInsert.ProductId,
            ProductName = product.Name,
            DiscountId = productLineInsert.DiscountId,
            DiscountValue = discount?.Value,
            Quantity = productLineInsert.Quantity,
            OriginalPrice = product.Price,
            FinalPrice = finalPrice
        };

        // 6. Agregar el ProductLine al Order
        order.ProductLines.Add(productLine); // ¡Aquí se agrega a la lista del Order!

        // 7. Guardar cambios
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProductLineId), new
        {
            id = productLine.Id
        }, productLine);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ProductLine>> PutProductLineId(int id, ProductLineInsert productLineInsert)
    {
        var productLine = await _context.ProductLines.FindAsync(id);
        if (productLine == null)
        {
            return NotFound("Linea de Producto no encontrada");
        }

        var order = await _context.Orders.FindAsync(productLineInsert.OrderId);
        if (order == null)
        {
            return NotFound("El pedido no existe");
        }

        var product = await _context.Products.FindAsync(productLineInsert.ProductId);
        if (product == null)
        {
            return NotFound("Producto no encontrado");
        }

        // 1. Validar que exista el Order
        if (order == null)
        {
            return NotFound("El pedido no existe");
        }

        // 2. Validar que exista el Product
        if (product == null)
        {
            return NotFound("Producto no encontrado");
        }

        // 3. Validar el Discount (si se proporciona un DiscountId)
        Discount? discount = null;
        if (productLineInsert.DiscountId.HasValue)
        {
            discount = await _context.Discounts.FindAsync(productLineInsert.DiscountId.Value);
            if (discount == null)
            {
                return NotFound("Descuento no encontrado");
            }
        }

        productLine.OrderId = productLineInsert.OrderId;
        productLine.ProductId = productLineInsert.ProductId;
        productLine.ProductName = product.Name;
        productLine.DiscountId = productLineInsert.DiscountId;
        productLine.DiscountValue = discount?.Value;
        productLine.Quantity = productLineInsert.Quantity;
        productLine.OriginalPrice = product.Price;
        productLine.FinalPrice = ProductLine.CalculateFinalPrice(product.Price, discount);

        await _context.SaveChangesAsync();

        return productLine;
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ProductLine>> DeleteProductLineId(int id)
    {
        var productLine = await _context.ProductLines.FindAsync(id);
        if (productLine == null)
        {
            return NotFound("Linea de Producto no encontrada");
        }

        _context.ProductLines.Remove(productLine);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Linea de Producto eliminada" });
    }
}