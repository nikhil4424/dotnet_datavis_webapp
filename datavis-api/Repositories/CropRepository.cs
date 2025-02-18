using DatavisApi.Dto;
using DatavisApi.Interfaces;
using DatavisApi.Data;
using DatavisApi.Models;
namespace DatavisApi.Repository;

public class CropRepository : ICropRepository
{
    private readonly CropDataContext _dataContext;
    public CropRepository(CropDataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public bool CropIdExists(int cropId)
    {
        return _dataContext.Crops.Any(crop => crop.Id == cropId);
    }

    public IOrderedQueryable<Crop> GetCrops()
    {
        return _dataContext.Crops.OrderBy(crop => crop.Id);
    }


    public bool CountryIdExists(int countryId)
    {
        return _dataContext.Countries.Any(country => country.Id == countryId);
    }

    public IOrderedQueryable<Country> GetCountries()
    {
        return _dataContext.Countries.OrderBy(country => country.Id);
    }


    public bool YearIdExists(int yearId)
    {
        return _dataContext.Years.Any(year => year.Id == yearId);
    }

    public IOrderedQueryable<Year> GetYears()
    {
        return _dataContext.Years.OrderBy(year => year.Id);
    }


    public IOrderedQueryable<CropYield> GetCropYieldsByCountry(int countryId)
    {
        return _dataContext.CropYields.Where(cropYield =>
            cropYield.Country.Id == countryId)
            .OrderBy(cy => cy.Id);
    }

    public IOrderedQueryable<CropYield> GetCropYieldsByYear(int yearId)
    {
        throw new NotImplementedException();
    }

    public IOrderedQueryable<CropYield> GetCropYieldsByCrop(int cropId)
    {
        return _dataContext.CropYields.Where(cropYield =>
            cropYield.Crop.Id == cropId)
            // .Select(cy => new CropYieldDto
            // {
            //     Id = cy.Id,
            //     Country = cy.Country.Name,
            //     Crop = cy.Crop.Name,
            //     Year = cy.Year.Value,
            //     Value = cy.Value
            // })
            .OrderBy(cy => cy.Id);
    }

    public IOrderedQueryable<CropYield> GetCropYieldsByCountryAndYear(int countryId, int yearId)
    {
        return _dataContext.CropYields.Where(cropYield =>
            cropYield.Country.Id == countryId &&
            cropYield.Year.Id == yearId)
            // .Select(cy => new CropYieldDto
            // {
            //     Id = cy.Id,
            //     Country = cy.Country.Name,
            //     Crop = cy.Crop.Name,
            //     Year = cy.Year.Value,
            //     Value = cy.Value
            // })
            .OrderBy(cy => cy.Id);
    }

    public IOrderedQueryable<CropYield> GetCropYieldsByCountryAndCrop(int countryId, int cropId)
    {
        return _dataContext.CropYields.Where(cropYield =>
            cropYield.Country.Id == countryId &&
            cropYield.Crop.Id == cropId)
            // .Select(cy => new CropYieldDto
            // {
            //     Id = cy.Id,
            //     Country = cy.Country.Name,
            //     Crop = cy.Crop.Name,
            //     Year = cy.Year.Value,
            //     Value = cy.Value
            // })
            .OrderBy(cy => cy.Id);
    }

    public IOrderedQueryable<CropYield> GetCropYieldsByYearAndCrop(int yearId, string cropId)
    {
        throw new NotImplementedException();
    }
}