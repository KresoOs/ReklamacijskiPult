using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;


namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ProizvodController : ReklamacijskiController<Proizvod, ProizvodDTORead, ProizvodDTOInsertUpdate>
    {
        public ProizvodController(ReklamacijskiPultContext context) : base(context)
        {
            DbSet = _context.Proizvodi;

        }
        

        protected override void KontrolaBrisanje(Proizvod entitet)
        {

            var entitetIzbaze = _context.Proizvodi
                .Include(x => x.Radninalozi)
                .FirstOrDefault(x => x.Sifra == entitet.Sifra);
            if(entitetIzbaze == null) 
            {
                throw new Exception("Ne postoji Proizvod s šifrom " + entitet.Sifra + " u bazi");

            }
            if(entitetIzbaze.Radninalozi != null && entitetIzbaze.Radninalozi.Count > 0) 
            {
                StringBuilder sb = new();
                sb.Append("Proizvod se ne može obrisati jer se nalazi u reklamacijama : ");
                foreach (var e in entitetIzbaze.Radninalozi)
                {
                    sb.Append(e.Sifra).Append(", ");
                }
                throw new Exception(sb.ToString()[..^2]);
            }
            



        }
    }
}


