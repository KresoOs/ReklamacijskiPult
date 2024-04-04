using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Radninalog:Entitet
    {
        

        [ForeignKey("proizvod")] // ovo pod navodnicima je naziv kolone u tablici 
        public Proizvod? Proizvod { get; set; }

        [ForeignKey("kupac")] // ovo pod navodnicima je naziv kolone u tablici 
        public Kupac? Kupac { get; set; }

        public DateTime Datum { get; set; }

    }
}
