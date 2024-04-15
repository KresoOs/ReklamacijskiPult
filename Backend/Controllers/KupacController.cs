using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KupacController : ReklamacijskiController<Kupac, KupacDTORead, KupacDTOInsertUpdate>
    {

        public KupacController(ReklamacijskiPultContext context) : base(context)
        {
            DbSet = _context.Kupci;
        }        
        
            


        protected override void KontrolaBrisanje(Kupac entitet)
            {

            var entitetizbaze = _context.Kupci
            .Include(x => x.Radninalozi)
            .FirstOrDefault(x=>x.Sifra == entitet.Sifra);
             if (entitetizbaze.Radninalozi != null && entitetizbaze.Radninalozi.Count > 0)
                {
                    StringBuilder sb = new();
                 sb.Append("Kupac se ne može obrisati jer ima radni nalog br: ");
                    foreach (var e in entitetizbaze.Radninalozi)
                     {
                    sb.Append(e.Sifra).Append(", ");
                     }
                     throw new Exception(sb.ToString()[..^2]);
                 }



        }
}   }

