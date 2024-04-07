
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

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
            var entitetIzbaze = _context.Djelatnici;
            if (entitetIzbaze == null)
            {
                throw new Exception("Ne postoji Djelatnik s šifrom " + entitet.Sifra + " u bazi");
            }
        }



    }
}
