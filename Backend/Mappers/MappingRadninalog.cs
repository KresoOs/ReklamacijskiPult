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
                 .ConstructUsing(Entitet =>
                                                            new RadninalogDTORead(
                                                                Entitet.Sifra,
                                                                Entitet.Proizvod.Ime,
                                                                Entitet.Kupac.Ime + " " + Entitet.Kupac.Prezime,
                                                                Entitet.Datum));
            }));
            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c =>
            {
                c.CreateMap<RadninalogDTOInsertUpdate, Radninalog>();
            }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c =>
                       {
                           c.CreateMap<Radninalog, RadninalogDTOInsertUpdate>()
                            .ConstructUsing(Entitet =>
                                                                       new RadninalogDTOInsertUpdate(
                                                                           Entitet.Proizvod == null ? null : Entitet.Proizvod.Ime,
                                                                           Entitet.Kupac == null ? null : Entitet.Kupac.Ime + " " + Entitet.Kupac.Prezime,
                                                                           Entitet.Datum));
                       }));
        }
    }
}
