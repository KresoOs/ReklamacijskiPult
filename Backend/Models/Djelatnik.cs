namespace Backend.Models
{
    public class Djelatnik:Entitet
    {
        public string? Ime { get; set; }
        public string? Prezime { get; set; }

        public ICollection<Radninalog>? Radninalozi { get; } = [];

    }
}
