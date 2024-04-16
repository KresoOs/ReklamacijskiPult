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
            if (entitet != null && entitet.Kupac != null)
            {
                throw new Exception("Ne može se obrisati radni nalog jer ima kupca");
            }

        }

        protected override Radninalog KreirajEntitet(RadninalogDTOInsertUpdate dto)
        {
            var kupac = _context.Kupci.Find(dto.KupacSifra) ?? throw new Exception("Ne postoji kupac sa šifrom :"+dto.KupacSifra+"u bazi");
            var proizvod = _context.Proizvodi.Find(dto.ProizvodSifra) ?? throw new Exception("Ne postoji proizvod sa šifrom" + dto.ProizvodSifra + "u bazi");
            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            var napomena = dto.Napomena;

            entitet.Proizvod = proizvod;
            entitet.Kupac = kupac;
            entitet.Datum = DateTime.Now;
            entitet.Napomena = napomena;
            return entitet;
            
        }
        protected override List<RadninalogDTORead> UcitajSve()
        {
            var lista = _context.Radninalozi
                    .Include(g => g.Proizvod)
                    .Include(g=>g.Kupac)
                    
                    
                    .ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return _mapper.MapReadList(lista);



        }
        protected override Radninalog NadiEntitet(int sifra)
        {
            return _context.Radninalozi.Include(g => g.Proizvod).Include(g=>g.Kupac).FirstOrDefault(x=>x.Sifra == sifra) ?? throw new Exception("Ne postoji nalog s šifrom " + sifra + " u bazi");
        }
        protected override Radninalog PromjeniEntitet(RadninalogDTOInsertUpdate dto, Radninalog entitet)
        {
            var kupac = _context.Kupci.Find(dto.KupacSifra) ?? throw new Exception("Ne postoji kupac s šifrom " + dto.KupacSifra + " u bazi");
            var proizvod = _context.Proizvodi.Find(dto.ProizvodSifra) ?? throw new Exception("Ne postoji proizvod s šifrom " + dto.ProizvodSifra + " u bazi");


            /*
            List<Polaznik> polaznici = entitet.Polaznici;
            entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.Polaznici = polaznici;
            */

            // ovdje je možda pametnije ići s ručnim mapiranje
            entitet.Proizvod = proizvod;
            entitet.Kupac = kupac;
            entitet.Datum = dto.Datum;
            entitet.Napomena = dto.Napomena;
            

            return entitet;
        }
    }


    
}
