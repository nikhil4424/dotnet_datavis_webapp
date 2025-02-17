using datavis_api.Dto;
using datavis_api.Interfaces;
using DatavisApi.Data;
using DatavisApi.Models;

namespace datavis_api.Repository;

public class CropRepository : ICropRepository
{
    private readonly CropDataContext _dataContext;
    public CropRepository(CropDataContext dataContext)
    {
        _dataContext = dataContext;
    }


    public ICollection<Crop> GetCrops()
    {
        return _dataContext.Crops.OrderBy(crop => crop.Id).ToList();
    }

    public bool CropIdExists(int cropId)
    {
        return _dataContext.Crops.Any(crop => crop.Id == cropId);
    }


    public ICollection<Country> GetCountries()
    {
        return _dataContext.Countries.OrderBy(country => country.Id).ToList();
    }

    public bool CountryIdExists(int countryId)
    {
        return _dataContext.Countries.Any(country => country.Id == countryId);
    }


    public ICollection<Year> GetYears()
    {
        return _dataContext.Years.OrderBy(year => year.Id).ToList();
    }

    public bool YearIdExists(int yearId)
    {
        return _dataContext.Years.Any(year => year.Id == yearId);
    }


    public ICollection<CropYield> GetCropYields()
    {
        return _dataContext.CropYields.OrderBy(cropYield => cropYield.Id).Take(100).ToList();
    }

    public ICollection<CropYieldDto> GetCropYieldsByCountry(int countryId)
    {
        return _dataContext.CropYields.Where(cropYield =>
            cropYield.Country.Id == countryId)
            .Select(cy => new CropYieldDto
            {
                Id = cy.Id,
                Country = cy.Country.Name,
                Crop = cy.Crop.Name,
                Year = cy.Year.Value,
                Value = cy.Value
            }
            )
            .ToList();
    }

    public ICollection<CropYieldDto> GetCropYieldsByCountryAndCrop(int countryId, int cropId)
    {
        return _dataContext.CropYields.Where(cropYield =>
            cropYield.Country.Id == countryId &&
            cropYield.Crop.Id == cropId)
            .Select(cy => new CropYieldDto
            {
                Id = cy.Id,
                Country = cy.Country.Name,
                Crop = cy.Crop.Name,
                Year = cy.Year.Value,
                Value = cy.Value
            })
            .ToList();
    }

    public ICollection<CropYieldDto> GetCropYieldsByCountryAndYear(int countryId, int yearId)
    {
        return _dataContext.CropYields.Where(cropYield =>
            cropYield.Country.Id == countryId &&
            cropYield.Year.Id == yearId)
            .Select(cy => new CropYieldDto
            {
                Id = cy.Id,
                Country = cy.Country.Name,
                Crop = cy.Crop.Name,
                Year = cy.Year.Value,
                Value = cy.Value
            })
            .ToList();
    }

    public ICollection<CropYieldDto> GetCropYieldsByCountryYearAndCrop(int countryId, int yearId, int cropId)
    {
        return _dataContext.CropYields.Where(cropYield =>
            cropYield.Country.Id == countryId &&
            cropYield.Year.Id == yearId &&
            cropYield.Crop.Id == cropId)
            .Select(cy => new CropYieldDto
            {
                Id = cy.Id,
                Country = cy.Country.Name,
                Crop = cy.Crop.Name,
                Year = cy.Year.Value,
                Value = cy.Value
            }
        ).ToList();
    }

    public ICollection<CropYieldDto> GetCropYieldsByCrop(int cropId)
    {
        return _dataContext.CropYields.Where(cropYield =>
            cropYield.Crop.Id == cropId)
            .Select(cy => new CropYieldDto
            {
                Id = cy.Id,
                Country = cy.Country.Name,
                Crop = cy.Crop.Name,
                Year = cy.Year.Value,
                Value = cy.Value
            })
            .ToList();
    }

    public ICollection<CropYieldDto> GetCropYieldsByYear(int yearId)
    {
        throw new NotImplementedException();
    }

    public ICollection<CropYieldDto> GetCropYieldsByYearAndCrop(int yearId, string cropId)
    {
        throw new NotImplementedException();
    }
}