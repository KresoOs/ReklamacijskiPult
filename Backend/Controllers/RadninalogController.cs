using Backend.Data;
using Backend.Mappers;
using Backend.Models;
using System.Text;

namespace Backend.Controllers
{
    public class RadninalogController : ReklamacijskiController<Radninalog,RadninalogDTORead,RadninalogDTOInsertUpdate>
    {
        public RadninalogController(ReklamacijskiPultContext context) : base(context)
        {
            DbSet = _context.Radninalozi;
            _mapper = new MappingRadninalog();
        }
        protected override void KontrolaBrisanje(Radninalog entitet)
        {
            if(entitet != null && entitet.Kupac != null && entitet.Proizvod != null) 
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("Ne može se izbrisati radninalog sa kupca " + entitet.Kupac.Ime + entitet.Kupac.Prezime +" i proizvoda " + entitet.Proizvod.Ime);

            }
            

        }
        protected override Radninalog KreirajEntitet(RadninalogDTOInsertUpdate dto)
        {
            var proizvod = _context.Proizvodi.Find(dto.ProizvodIme) ?? throw new Exception("Ne postoji Proizvod sa imenom "+dto.ProizvodIme+" u bazi "); 
            var kupac = _context.Kupci.Find(dto.KupacImePrezime) ?? throw new Exception("Ne postoji Kupac sa imenom " + dto.KupacImePrezime + " u bazi ");
            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.Proizvod = proizvod;
            entitet.Kupac = kupac;
            entitet.Datum = DateTime.Now;
            return entitet;
        }

    }
}
