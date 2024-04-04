using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Status:Entitet
    {

        [ForeignKey("radninalog")] // ovo pod navodnicima je naziv kolone u tablici 
        public Radninalog? Radninalog { get; set; }

        [ForeignKey("djelatnik")] // ovo pod navodnicima je naziv kolone u tablici 
        public Djelatnik? Djelatnik { get; set; }

        public String Naziv {  get; set; }

    }
}
