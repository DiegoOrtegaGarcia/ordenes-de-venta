using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiProyectoMySQL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MiProyectoMySQL.Controllers; // Namespace correcto

[ApiController]
[Route("api/[controller]")]
public class ProductosController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductosController(AppDbContext context)
    {
        _context = context;
    }

    // Cambia todas las referencias de Producto a Product
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProductos()
    {
        return await _context.Products.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProductoId(int id)
    {
        var producto = await _context.Products.FindAsync(id);
        return producto == null ? NotFound("Producto no encontrado") : producto;
    }

    [HttpPost]
    public async Task<ActionResult<Product>> PostProducto(ProductInsert productoinsert)
    {
        // Crear un nuevo Product a partir de ProductInsert
        var product = new Product
        {
            Name = productoinsert.Name,
            Price = productoinsert.Price
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        // Retorna el producto creado (incluyendo el Id generado)
        return CreatedAtAction(nameof(GetProductoId), new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Product>> PutProductId(int id, ProductInsert productInsert)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            return NotFound("Producto no encontrado");
        }

        product.Name = productInsert.Name;
        product.Price = productInsert.Price;

        await _context.SaveChangesAsync();

        return product;
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Product>> DeleteProductId(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            return NotFound("Producto no encontrado");
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Producto eliminado" });
    }
}