using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class ReklamacijskiPultContext:DbContext
    {
        public ReklamacijskiPultContext(DbContextOptions<ReklamacijskiPultContext> options) : base(options) { }
        public DbSet<Djelatnik> Djelatnici { get; set; }
    }
}
