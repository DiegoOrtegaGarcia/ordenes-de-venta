namespace MiProyectoMySQL.Models;
public class Discount

{
    public int Id { get; set; }
    public DateTime ValidFrom { get; set; }
    public DateTime ValidTo { get; set; }
    public decimal Value { get; set; }
    public bool IsPercentage { get; set; }
}