using DatavisApi.Dto;
using DatavisApi.Models;
using DatavisApi.Interfaces;

namespace DatavisApi.Services
{
    // Calls CropRepository functions to get data and converts it to DTOs. These methods are called in CropController.
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

        public int GetMinYearValue()
        {
            int year = _cropRepository.GetMinYear();
            return year;
        }

        public int GetMaxYearValue()
        {
            int year = _cropRepository.GetMaxYear();
            return year;
        }

        public ICollection<CropYieldDto> GetCropYieldsDtoByCountriesAndCrop(int[] countryIds, int cropId)
        {
            IOrderedQueryable<CropYield> cropYields = _cropRepository.GetCropYieldsByCountriesAndCrop(countryIds, cropId);

            ICollection<CropYieldDto> cropYieldsDto = cropYields
                .Select(cropYield => Helpers.ModelToDto.CropYieldToDto(cropYield))
                .ToList();

            return cropYieldsDto;
        }

        public ICollection<CropYieldDto> GetCropYieldsDtoWithinYearRangeByCrop(int yearStart, int yearEnd, int cropId)
        {
            IOrderedQueryable<CropYield> cropYields = _cropRepository.GetCropYieldsWithinYearRangeByCrop(yearStart, yearEnd, cropId);

            ICollection<CropYieldDto> cropYieldDtos = cropYields
                .Select(cy => Helpers.ModelToDto.CropYieldToDto(cy))
                .ToList();

            return cropYieldDtos;
        }

        public ICollection<CountryYieldSum> GetCountryYieldSumByYearRangeAndCrop(int yearStart, int yearEnd, int cropId)
        {
            IQueryable<CountryYieldSum> sumYields = _cropRepository.GetCountryYieldSumByYearRangeAndCrop(yearStart, yearEnd, cropId);

            return sumYields.ToList();
        }
    }
}