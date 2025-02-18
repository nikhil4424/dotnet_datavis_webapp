using DatavisApi.Dto;
using DatavisApi.Models;

namespace DatavisApi.Interfaces;

public interface ICropRepository
{
    public bool CropIdExists(int cropId);
    ICollection<Crop> GetCrops();
    public bool CountryIdExists(int countryId);
    ICollection<Country> GetCountries();
    public bool YearIdExists(int yearId);
    ICollection<Year> GetYears();

    ICollection<CropYield> GetCropYields();
    ICollection<CropYieldDto> GetCropYieldsByCountry(int countryId);
    ICollection<CropYieldDto> GetCropYieldsByYear(int yearId);
    ICollection<CropYieldDto> GetCropYieldsByCrop(int cropId);
    ICollection<CropYieldDto> GetCropYieldsByCountryAndYear(int countryId, int yearId);
    ICollection<CropYieldDto> GetCropYieldsByCountryAndCrop(int countryId, int cropId);
    ICollection<CropYieldDto> GetCropYieldsByYearAndCrop(int yearId, string cropId);
    ICollection<CropYieldDto> GetCropYieldsByCountryYearAndCrop(int countryId, int yearId, int cropId);
}