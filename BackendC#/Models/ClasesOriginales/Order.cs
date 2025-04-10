
namespace MiProyectoMySQL.Models;

public class Order
{
    public int Id { get; set; }
    public DateTime Date { get; set; } = DateTime.Now;

    public int ClientId { get; set; } // Clave foránea hacia Client

    public virtual List<ProductLine> ProductLines { get; set; } = new List<ProductLine>();

    public decimal TotalOrderPrice => ProductLines?.Sum(x => x.TotalPrice) ?? 0m; // Usa 0m en lugar de 0
}
