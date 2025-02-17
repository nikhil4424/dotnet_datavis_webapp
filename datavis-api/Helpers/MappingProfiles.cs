using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DatavisApi.Models;
using datavis_api.Dto;

namespace datavis_api.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Country, CountryDto>();
            CreateMap<Crop, CropDto>();
            CreateMap<Year, YearDto>();
            CreateMap<CropYield, CropYieldDto>();
        }
    }
}