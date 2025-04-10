using Microsoft.EntityFrameworkCore;

namespace MiProyectoMySQL.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Usar nombres en inglés para mantener consistencia
        public DbSet<Product> Products { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<ProductLine> ProductLines { get; set; }
        public DbSet<Discount> Discounts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Client>()
                .HasMany(c => c.Orders)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Order>()
                .HasMany(o => o.ProductLines)
                .WithOne()
                .HasForeignKey(p => p.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ProductLine>()
                .HasOne(pl => pl.Product)
                .WithMany()
                .HasForeignKey(pl => pl.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Client>()
                .Property(c => c.Money)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Discount>()
                .Property(d => d.Value)
                .HasPrecision(5, 2);

            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);

            modelBuilder.Entity<ProductLine>()
                .Property(pl => pl.OriginalPrice)
                .HasPrecision(18, 2);

            modelBuilder.Entity<ProductLine>()
                .Property(pl => pl.FinalPrice)
                .HasPrecision(18, 2);

            modelBuilder.Entity<ProductLine>()
                .Property(pl => pl.DiscountValue)
                .HasPrecision(18, 2);
        }
    }
}
