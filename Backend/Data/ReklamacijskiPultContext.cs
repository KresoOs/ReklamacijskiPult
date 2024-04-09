using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class ReklamacijskiPultContext:DbContext
    {
        public ReklamacijskiPultContext(DbContextOptions<ReklamacijskiPultContext> options) : base(options) { }
        public DbSet<Djelatnik> Djelatnici { get; set; }
        public DbSet<Proizvod> Proizvodi { get; set; }

        
        public DbSet<Stanje> Stanja { get; set; }
        public DbSet<Kupac> Kupci { get; set; }
    }
}
