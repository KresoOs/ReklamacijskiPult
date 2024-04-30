using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Radninalog : Entitet
    {
        [ForeignKey("proizvod")]

        public Proizvod? Proizvod { get; set; }

        [ForeignKey("kupac")]

        public Kupac? Kupac { get; set; }

        public DateOnly? Datum { get; set; }

        public string? Napomena  { get; set; }

        public List<Djelatnik>? Djelatnici { get; set; }
        public List<Stanje>? Stanja { get; set; }
        

    }
}
