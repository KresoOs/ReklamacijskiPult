using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class ReklamacijskiPultContext:DbContext
    {
        public ReklamacijskiPultContext(DbContextOptions<ReklamacijskiPultContext> options) : base(options) { }
        public DbSet<Djelatnik> Djelatnici { get; set; }
        public DbSet<Proizvod> Proizvodi { get; set; }


        public DbSet<Radninalog> Radninalozi { get; set; }
        public DbSet<Stanje> Stanja { get; set; }
        public DbSet<Kupac> Kupci { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Radninalog>().HasOne(g => g.Kupac);
            modelBuilder.Entity<Radninalog>().HasOne(g => g.Proizvod);


            modelBuilder.Entity<Radninalog>()
                .HasMany(g => g.Stanja)
                .WithMany(p => p.Radninalozi)
                .UsingEntity<Dictionary<string, object>>("promjene",
                c => c.HasOne<Stanje>().WithMany().HasForeignKey("stanje"),
                c => c.HasOne<Radninalog>().WithMany().HasForeignKey("radninalog"),
                c => c.ToTable("promjene")
                );
                
                
                
            modelBuilder.Entity<Radninalog>()
                .HasMany(g => g.Djelatnici)
                .WithMany(p => p.Radninalozi)
                .UsingEntity<Dictionary<string, object>>("promjene",
                c => c.HasOne<Djelatnik>().WithMany().HasForeignKey("djelatnik"),
                c => c.HasOne<Radninalog>().WithMany().HasForeignKey("radninalog"),
                c => c.ToTable("promjene")
                );

        }

    }
}
