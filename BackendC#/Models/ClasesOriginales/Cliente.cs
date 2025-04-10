namespace MiProyectoMySQL.Models;

public class Client
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public decimal Money { get; set; }

    public virtual List<Order> Orders { get; set; } = new List<Order>();

    public void AddOrder(Order order) // Mayúscula inicial y void
    {
        Orders.Add(order);
    }

}