namespace MiProyectoMySQL.Models;

public class ProductLineInsert
{
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public int? DiscountId { get; set; }
    public int Quantity { get; set; }
}