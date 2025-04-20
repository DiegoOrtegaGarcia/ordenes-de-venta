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

        // Calcular el total potencial de la orden
        var existingLines = await _context.ProductLines
            .Where(pl => pl.OrderId == productLineInsert.OrderId)
            .ToListAsync();

        decimal currentTotal = existingLines.Sum(pl => pl.TotalPrice);
        decimal potentialTotal = currentTotal + productLine.TotalPrice;

        // Obtener cliente y validar crédito
        var client = await _context.Clients.FindAsync(order.ClientId);
        if (client == null) return NotFound("Cliente no encontrado");

        if (potentialTotal > client.Credit)
        {
            return BadRequest("Crédito insuficiente. No se puede agregar la línea.");
        }

        // Restar el total de la línea al crédito del cliente
        client.Credit -= productLine.TotalPrice; // ¡Nueva línea!

        // Agregar la línea al pedido y guardar cambios
        order.ProductLines.Add(productLine);
        await _context.SaveChangesAsync(); // Guarda cambios en ProductLine y Client

        return CreatedAtAction(nameof(GetProductLineId), new { id = productLine.Id }, productLine);

    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ProductLine>> PutProductLineId(int id, ProductLineInsert productLineInsert)
    {
        var productLine = await _context.ProductLines.FindAsync(id);
        if (productLine == null)
        {
            return NotFound("Linea de Producto no encontrada");
        }

        // Obtener la orden original (antes de cambios)
        var originalOrder = await _context.Orders.FindAsync(productLine.OrderId);
        if (originalOrder == null)
        {
            return NotFound("Orden original no encontrada");
        }

        // Obtener el cliente original
        var originalClient = await _context.Clients.FindAsync(originalOrder.ClientId);
        if (originalClient == null)
        {
            return NotFound("Cliente original no encontrado");
        }

        // Guardar el total antiguo
        decimal oldTotal = productLine.TotalPrice;

        // Validar y actualizar la línea (productLineInsert)
        var newProduct = await _context.Products.FindAsync(productLineInsert.ProductId);
        if (newProduct == null)
        {
            return NotFound("Producto no encontrado");
        }

        Discount? discount = null;
        if (productLineInsert.DiscountId.HasValue)
        {
            discount = await _context.Discounts.FindAsync(productLineInsert.DiscountId.Value);
            if (discount == null)
            {
                return NotFound("Descuento no encontrado");
            }
        }

        // Actualizar propiedades de la línea
        productLine.OrderId = productLineInsert.OrderId;
        productLine.ProductId = productLineInsert.ProductId;
        productLine.ProductName = newProduct.Name;
        productLine.OriginalPrice = newProduct.Price;
        productLine.FinalPrice = ProductLine.CalculateFinalPrice(newProduct.Price, discount);
        productLine.DiscountId = productLineInsert.DiscountId;
        productLine.DiscountValue = discount?.Value;
        productLine.Quantity = productLineInsert.Quantity;

        // Calcular nuevo total
        decimal newTotal = productLine.TotalPrice;
        decimal difference = newTotal - oldTotal;

        // Obtener la nueva orden (si cambió el OrderId)
        var newOrder = await _context.Orders.FindAsync(productLineInsert.OrderId);
        if (newOrder == null)
        {
            return NotFound("Nueva orden no encontrada");
        }

        // Obtener el cliente de la nueva orden
        var newClient = await _context.Clients.FindAsync(newOrder.ClientId);
        if (newClient == null)
        {
            return NotFound("Cliente nuevo no encontrado");
        }

        // Si la orden cambió, restaurar crédito al cliente original y restar al nuevo
        if (originalOrder.Id != newOrder.Id)
        {
            originalClient.Credit += oldTotal; // Restaura crédito al cliente original
            newClient.Credit -= newTotal; // Resta crédito al nuevo cliente
        }
        else
        {
            // Misma orden: ajustar crédito según la diferencia
            newClient.Credit -= difference;
        }

        // Validar crédito suficiente (solo si diferencia es positiva)
        if (newClient.Credit < 0)
        {
            return BadRequest("Crédito insuficiente");
        }

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

        var OrderId = productLine.OrderId;

        var order = await _context.Orders.FindAsync(OrderId);
        if (order == null)
        {
            return NotFound("El pedido no existe");
        }

        var client = await _context.Clients.FindAsync(order.ClientId);
        if (client == null)
        {
            return NotFound("Cliente no encontrado");
        }

        // Restar el total de la línea al crédito del cliente
        client.Credit += productLine.TotalPrice; // ¡Nueva línea!

        _context.ProductLines.Remove(productLine);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Linea de Producto eliminada" });
    }
}