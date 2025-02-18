using DatavisApi.Dto;
using DatavisApi.Models;

namespace DatavisApi.Helpers
{
    public class ModelToDto
    {
        public static CropYieldDto CropYieldToDto(CropYield cropYield)
        {
            return new CropYieldDto
            {
                Id = cropYield.Id,
                Country = cropYield.Country.Name,
                Crop = cropYield.Crop.Name,
                Year = cropYield.Year.Value,
                Value = cropYield.Value
            };
        }
    }
}