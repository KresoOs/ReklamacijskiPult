using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace Backend.Controllers
{
    public class KupacController : ReklamacijskiController<Kupac, KupacDTORead, KupacDTOInsertUpdate>
    {

        public KupacController(ReklamacijskiPultContext context) : base(context)
        {
            DbSet = _context.Kupci;
        }
        protected override void KontrolaBrisanje(Kupac entitet)
        {

            var lista = _context.Radninalozi
                .Include(x =>x.Kupac)
                .Where(x=>x.Kupac.Sifra == entitet.Sifra)
                .ToList();
            if (lista != null && lista.Count >0)
            {
                StringBuilder sb = new();
                sb.Append("Kupac se ne može obrisati jer ima radni nalog br: ");
                foreach (var e in lista)
                {
                    sb.Append(e.Sifra).Append(", ");
                }
                throw new Exception(sb.ToString()[..^2]);
            }



        }
    }
}
