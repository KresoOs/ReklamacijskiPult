using Backend.Models;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;


namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class StanjeController : ReklamacijskiController<Stanje, StanjeDTORead, StanjeDTOInsertUpdate>
    {

        public StanjeController(ReklamacijskiPultContext context) : base(context)
        {

            DbSet = _context.Stanja;
        }




        protected override void KontrolaBrisanje(Stanje entitet)
        {
            var entitetIzbaze = _context.Stanja

                .FirstOrDefault(x => x.Sifra == entitet.Sifra);
            if (entitetIzbaze == null)
            {

                throw new Exception("Ne postoji Stanje s šifrom " + entitet.Sifra + " u bazi");
            }
        }


    }
        
        }
