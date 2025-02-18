using DatavisApi.Dto;
using DatavisApi.Models;

namespace DatavisApi.Helpers
{
    public class ModelToDto
    {
        public static CountryDto CountryToDto(Country country)
        {
            return new CountryDto
            {
                Id = country.Id,
                Name = country.Name
            };
        }

        public static CropDto CropToDto(Crop crop)
        {
            return new CropDto
            {
                Id = crop.Id,
                Name = crop.Name
            };
        }

        public static CropYieldDto CropYieldToDto(CropYield cropYield)
        {
            // CropYieldDto cropYieldDto = new
            // (
            //     cropYield.Id,
            //     cropYield.Country.Name,
            //     cropYield.Crop.Name,
            //     cropYield.Year.Value,
            //     cropYield.Value
            // );

            return new CropYieldDto
            (
                cropYield.Id,
                cropYield.Country.Name,
                cropYield.Crop.Name,
                cropYield.Year.Value,
                cropYield.Value
            );
        }

        public static YearDto YearToDto(Year year)
        {
            return new YearDto
            {
                Id = year.Id,
                Value = year.Value
            };
        }
    }
}