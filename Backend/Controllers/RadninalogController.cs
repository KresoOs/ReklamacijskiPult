using Backend.Models;
using Backend.Data;
using Backend.Mappers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.RegularExpressions;

namespace Backend.Controllers
{
   
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RadninalogController : ReklamacijskiController<Radninalog, RadninalogDTORead, RadninalogDTOInsertUpdate>
    {
        public RadninalogController(ReklamacijskiPultContext context) : base(context)
        {
            DbSet = _context.Radninalozi;
            _mapper = new MappingRadninalog();
        }
        protected override void KontrolaBrisanje(Radninalog entitet)
        {
            if (entitet == null)
            {
                throw new Exception("Ne može se obrisati radni nalog jer ima promjenu statusa");
            }

        }

        protected override Radninalog KreirajEntitet(RadninalogDTOInsertUpdate dto)
        {
            var kupac = _context.Kupci.Find(dto.KupacSifra) ?? throw new Exception("Ne postoji kupac sa šifrom :"+dto.KupacSifra+"u bazi");
            var proizvod = _context.Proizvodi.Find(dto.ProizvodSifra) ?? throw new Exception("Ne postoji proizvod sa šifrom" + dto.ProizvodSifra + "u bazi");
            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            var napomena = dto.Napomena;
            var datum = dto.Datum;
            
            entitet.Proizvod = proizvod;
            entitet.Kupac = kupac;
            entitet.Datum = datum;
            entitet.Napomena = napomena;
            entitet.Stanja = [];
            return entitet;
            
        }
        protected override List<RadninalogDTORead> UcitajSve()
        {
            var lista = _context.Radninalozi
                    .Include(g => g.Proizvod)
                    .Include(g=>g.Kupac)
                    .Include(g=>g.Stanja)
                    
                    
                    .ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return _mapper.MapReadList(lista);



        }
        protected override Radninalog NadiEntitet(int sifra)
        {
            return _context.Radninalozi.Include(g => g.Proizvod).Include(g=>g.Kupac).Include(g=>g.Stanja).FirstOrDefault(x=>x.Sifra == sifra) ?? throw new Exception("Ne postoji nalog s šifrom " + sifra + " u bazi");
        }
        protected override Radninalog PromjeniEntitet(RadninalogDTOInsertUpdate dto, Radninalog entitet)
        {
            var kupac = _context.Kupci.Find(dto.KupacSifra) ?? throw new Exception("Ne postoji kupac s šifrom " + dto.KupacSifra + " u bazi");
            var proizvod = _context.Proizvodi.Find(dto.ProizvodSifra) ?? throw new Exception("Ne postoji proizvod s šifrom " + dto.ProizvodSifra + " u bazi");


           
            entitet.Proizvod = proizvod;
            entitet.Kupac = kupac;
            entitet.Datum = dto.Datum;
            entitet.Napomena = dto.Napomena;
            

            return entitet;
        }
        [HttpGet]
        [Route("statusi")]
        public IActionResult GetStatuses()
        {

            var lista = _context.Stanja.ToList();


            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            var filtLista = lista.Select(s => new {s.Sifra,s.Naziv });
            return new JsonResult(filtLista);

        }
            [HttpPut]
        [Route("{sifra:int}/PromjeniStatus/{statusSifra:int}")]
        public IActionResult ChangeStatus(int sifra, int statusSifra)
        {
            var radninalog = NadiEntitet(sifra);
            if (radninalog == null)
            {
                throw new Exception("Radni nalog ne postoji");
            }

            var status = _context.Stanja.FirstOrDefault(s => s.Sifra == statusSifra);
            if (status == null)
            {
                throw new Exception("Status sa zadanom sifrom ne postoji");
            }
            if (radninalog.Stanja != null)
            {
                radninalog.Stanja.Remove(radninalog.Stanja.FirstOrDefault(s => s.Sifra == radninalog.Stanja.First().Sifra));
            }

            radninalog.Stanja.Add(status);
            _context.Radninalozi.Update(radninalog);
            _context.SaveChanges();


            return Ok();
        }
    }


    
}
