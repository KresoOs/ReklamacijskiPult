using AutoMapper;
using Backend.Models;

namespace Backend.Mappers
{
    public class MappingRadninalog : Mapping<Radninalog, RadninalogDTORead, RadninalogDTOInsertUpdate>

    {
        public MappingRadninalog()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c =>
            {
                c.CreateMap<Radninalog, RadninalogDTORead>()
                .ConstructUsing(entitet =>
                new RadninalogDTORead(
                    entitet.Sifra,
                    entitet.Proizvod == null ? "" : entitet.Proizvod.Ime,
                    entitet.Kupac == null ? "" : (entitet.Kupac.Ime + " " + entitet.Kupac.Prezime).Trim(),
                    entitet.Datum,
                    entitet.Napomena));

            }));
            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c =>
                        {
                            c.CreateMap<Radninalog, RadninalogDTOInsertUpdate>()
                            .ConstructUsing(entitet =>
                            new RadninalogDTOInsertUpdate(

                                                            entitet.Proizvod == null ? null : entitet.Proizvod.Sifra,
                                                            entitet.Kupac == null ? null : entitet.Kupac.Sifra,
                                                            entitet.Datum,
                                                            entitet.Napomena));


                        }));
            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c =>
            {

                c.CreateMap<RadninalogDTOInsertUpdate, Radninalog>();

            }));






        }
    }
}

