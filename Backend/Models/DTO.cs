﻿





using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public record DjelatnikDTORead(int Sifra, string? Ime, string? Prezime);

    public record DjelatnikDTOInsertUpdate(

        [Required(ErrorMessage ="Obavezan unos")]
        string? Ime,
        [Required(ErrorMessage ="Obavezan unos")]
        string? Prezime);


    public record KupacDTORead(int Sifra, string? Ime, string? Prezime, string? Telefon, string? Email);

    public record KupacDTOInsertUpdate(


        [

        Required(ErrorMessage ="Obavezan unos")]
        string? Ime,
        [Required(ErrorMessage ="Obavezan unos")]
        string? Prezime,
        [Required(ErrorMessage ="Obavezan unos")]
        string? Telefon,
        [Required(ErrorMessage ="Obavezan unos")]
        [EmailAddress(ErrorMessage ="Nije ispravan e-mail")]
        string? Email);


    public record ProizvodDTORead(int Sifra, string? Ime, string? Opis, string? Jedinica_Kolicine);

    public record ProizvodDTOInsertUpdate(

        [Required(ErrorMessage ="Obavezan unos")]
        string? Ime,
        [Required(ErrorMessage ="Obavezan unos")]
        string? Opis,
        [Required(ErrorMessage = "Obavezan unos")]
        string? Jedinica_Kolicine);






    public record StanjeDTORead(int Sifra, string? Naziv);

    public record StanjeDTOInsertUpdate(


        [Required(ErrorMessage ="Obavezan unos")]
        string? Naziv);

    public record RadninalogDTORead(int Sifra, string? ProizvodIme, string? KupacImePrezime, DateTime? Datum, string? Napomena);

    public record RadninalogDTOInsertUpdate(

        int? ProizvodSifra,
        int? KupacSifra,
        [Required(ErrorMessage ="Obavezan unos")]
        DateTime? Datum,
        [Required(ErrorMessage ="Obavezan unos")]
        string? Napomena


        );
    public record PromjenaDTORead(int sifra , int? DjelatnikSifra , int? StanjeSifra , int? RadninalogSifra );

    public record PromjenaDTOInsertUpdate(
        int? DjelatnikSifra,
        int? StanjeSifra,
        int? RadninalogSifra
        );













}
