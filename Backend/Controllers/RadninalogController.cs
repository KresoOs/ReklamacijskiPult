using Backend.Models;
using Backend.Data;
using Backend.Mappers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Text;

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
        

    }
}
