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
            var entitetIzbaze = _context.Proizvodi;
            if (entitetIzbaze == null)
            {
                throw new Exception("Ne postoji Djelatnik s šifrom " + entitet.Sifra + " u bazi");
            }
        }

        //protected override void KontrolaBrisanje(Proizvod entitet)
        //{

        //    var lista = _context.Radninalozi
        //        .Include(x => x.Proizvod)
        //        .Where(x => x.Proizvod.Sifra == entitet.Sifra)
        //        .ToList();
        //    if (lista != null && lista.count > 0)
        //    {
        //        StringBuilder sb = new();
        //        sb.Append("Proizvod se ne može obrisati jer ima radni nalog br: ");
        //        foreach (var e in lista)
        //        {
        //            sb.Append(e.Sifra).Append(", ");
        //        }
        //        throw new Exception(sb.ToString()[..^2]);
        //    }



    }
    }


