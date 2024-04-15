using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Stanje:Entitet
    {

        

        public String? Naziv {  get; set; }
        public ICollection<Radninalog>? Radninalozi { get; } = [];

    }
}
