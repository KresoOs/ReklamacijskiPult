using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;


namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ProizvodController: ControllerBase 
    {
        private readonly ReklamacijskiPultContext _context;

        public ProizvodController(ReklamacijskiPultContext context)
        {
            _context = context;
        }
        [HttpGet]

        public IActionResult Get()
        {
            return new JsonResult(_context.Proizvodi.ToList());

        }
        [HttpPost]

        public IActionResult Post(Proizvod proizvod)
        {
            _context.Proizvodi.Add(proizvod);
            _context.SaveChanges();
            return new JsonResult(proizvod);

        }
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Proizvod proizvod)
        {
            var proizvodIzBaze = _context.Proizvodi.Find(sifra);
            proizvodIzBaze.Ime = proizvod.Ime;
            proizvodIzBaze.Opis = proizvod.Opis;
            proizvodIzBaze.Jedinica_Kolicine = proizvod.Jedinica_Kolicine;
            _context.Proizvodi.Update(proizvodIzBaze);
            _context.SaveChanges();
            return new JsonResult(proizvodIzBaze);
        }
        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("aplication/json")]
        public IActionResult Delete(int sifra)
        {
            var proizvodIzBaze = _context.Proizvodi.Find(sifra);
            _context.Proizvodi.Remove(proizvodIzBaze);
            _context.SaveChanges(); 
            return new JsonResult(new {poruka="Obrisano"});
        }

    }
}
