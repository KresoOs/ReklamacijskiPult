
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class DjelatnikController : ReklamacijskiController<Djelatnik,DjelatnikDTORead,DjelatnikDTOInsertUpdate>
    {

        public DjelatnikController(ReklamacijskiPultContext context): base(context) 
        {
            DbSet= _context.Djelatnici;

        }
        protected override void KontrolaBrisanje(Djelatnik entitet)
        {
            var entitetIzbaze = _context.Djelatnici
            .Include(x => x.Radninalozi)
            .FirstOrDefault(x => x.Sifra == entitet.Sifra);
            if (entitetIzbaze == null)
            {
                throw new Exception("Ne postoji Djelatnik s šifrom " + entitet.Sifra + " u bazi");
            }
            if (entitetIzbaze.Radninalozi != null && entitetIzbaze.Radninalozi.Count > 0)
            {
                StringBuilder sb = new();
                sb.Append("Djelatnik se ne može obrisati jer je postavljen na radnim nalozima : ");
                foreach (var e in entitetIzbaze.Radninalozi)
                {
                    sb.Append(e.Sifra).Append(", ");
                }
                throw new Exception(sb.ToString()[..^2]);
            }

        }



    }
}
