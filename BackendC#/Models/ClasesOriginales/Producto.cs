// En Models/Product.cs (nombre en inglés)
using System.ComponentModel.DataAnnotations;

namespace MiProyectoMySQL.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
    }
}