
namespace MiProyectoMySQL.Models;

public class ProductLine
{
    public int OrderId { get; set; } // Clave foránea hacia Order
    public int Id { get; set; }
    public int ProductId { get; set; }

    public string ProductName { get; set; } = string.Empty;
    public int? DiscountId { get; set; } // Nullable si no tiene descuento

    public decimal? DiscountValue { get; set; } // Valor del descuento
    public int Quantity { get; set; }
    public decimal OriginalPrice { get; set; }
    public decimal FinalPrice { get; set; }
    public decimal TotalPrice => FinalPrice * Quantity;

    public virtual Product Product { get; set; }
    public virtual Discount? Discount { get; set; }

    public ProductLine() { }

    public static decimal CalculateFinalPrice(decimal basePrice, Discount? discount)
    {
        if (discount == null) return basePrice;

        if (discount.IsPercentage)
        {
            return basePrice * (1 - discount.Value / 100);
        }
        return basePrice - discount.Value;
    }
}
