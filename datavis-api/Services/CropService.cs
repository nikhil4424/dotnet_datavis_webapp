using DatavisApi.Dto;
using DatavisApi.Models;
using DatavisApi.Interfaces;

namespace DatavisApi.Services
{
    // Calls CropRepository functions to get data and converts it to DTOs
    public class CropService
    {
        private readonly ICropRepository _cropRepository;
        public CropService(ICropRepository cropRepository)
        {
            _cropRepository = cropRepository;
        }

        public ICollection<CountryDto> GetCountriesDto()
        {
            IOrderedQueryable<Country> countries = _cropRepository.GetCountries();

            ICollection<CountryDto> countriesDto = countries.Select(country =>
                Helpers.ModelToDto.CountryToDto(country))
                .ToList();

            return countriesDto;
        }

        public ICollection<CropDto> GetCropsDto()
        {
            IOrderedQueryable<Crop> crops = _cropRepository.GetCrops();

            ICollection<CropDto> cropsDto = crops.Select(crop =>
                Helpers.ModelToDto.CropToDto(crop))
                .ToList();

            return cropsDto;
        }

        public ICollection<YearDto> GetYearsDto()
        {
            IOrderedQueryable<Year> years = _cropRepository.GetYears();

            ICollection<YearDto> yearsDto = years.Select(year =>
                Helpers.ModelToDto.YearToDto(year))
                .ToList();

            return yearsDto;
        }

        public ICollection<CropYieldDto> GetCropYieldsDtoByCountryAndCrop(int countryId, int cropId)
        {
            IOrderedQueryable<CropYield> cropYields = _cropRepository.GetCropYieldsByCountryAndCrop(countryId, cropId);

            ICollection<CropYieldDto> cropYieldDtos = cropYields
                .Select(cropYield => Helpers.ModelToDto.CropYieldToDto(cropYield))
                .ToList();

            return cropYieldDtos;
        }
    }
}