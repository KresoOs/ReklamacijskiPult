





using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public record DjelatnikDTORead(int Sifra, string Ime, string Prezime);

    public record DjelatnikDTOInsertUpdate(

        [Required(ErrorMessage ="Obavezan unos")]
        string? Ime,
        [Required(ErrorMessage ="Obavezan unos")]
        string? Prezime);


    














}
