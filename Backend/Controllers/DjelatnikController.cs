
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class DjelatnikController: ControllerBase
    {
        private readonly ReklamacijskiPultContext _context;

        public DjelatnikController(ReklamacijskiPultContext context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            return new JsonResult(_context.Djelatnici.Find(sifra));
        }
        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.Djelatnici.ToList());
        }
        [HttpPost]
        public IActionResult Post(Djelatnik djelatnik)
        {
            _context.Djelatnici.Add(djelatnik);
            _context.SaveChanges();
            return new JsonResult(djelatnik);
        }
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Djelatnik djelatnik)
        {
            var djelatnikIzBaze = _context.Djelatnici.Find(sifra);
            djelatnikIzBaze.Ime = djelatnik.Ime;
            djelatnikIzBaze.Prezime = djelatnik.Prezime;
            _context.Djelatnici.Update(djelatnikIzBaze);
            _context.SaveChanges();
            return new JsonResult(djelatnikIzBaze);
        }
        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var djelatnikIzBaze = _context.Djelatnici.Find(sifra);
            
            _context.Djelatnici.Remove(djelatnikIzBaze);
            _context.SaveChanges();
            return new JsonResult(new {poruka="Obrisano" });
        }
    }
}
