using Backend.Models;
using Backend.Data;
using Backend.Mappers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class  RadninalogController : ReklamacijskiController<Radninalog,RadninalogDTORead,RadninalogDTOInsertUpdate>
    {
        public RadninalogController(ReklamacijskiPultContext context) : base(context)
        {
            DbSet = _context.Radninalozi;
            _mapper = new MappingRadninalog();
        }
        protected override void KontrolaBrisanje(Radninalog entitet)
        {
           if (entitet != null && entitet.) { }
    }
}
