using DatavisApi.Interfaces;
using DatavisApi.Data;
using DatavisApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization.Infrastructure;

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
            .OrderBy(cy => cy.Id);
    }

    public IOrderedQueryable<CropYield> GetCropYieldsByCountriesAndCrop(int[] countryIds, int cropId)
    {
        IOrderedQueryable<CropYield> cropYields = _dataContext.CropYields
            .Include(cy => cy.Country)
            .Include(cy => cy.Crop)
            .Include(cy => cy.Year)
            .Where(cy =>
                countryIds.Contains(cy.Country.Id) &&
                cy.Crop.Id == cropId
            ).OrderBy(cy => cy.Year.Value);

        return cropYields;
    }

    public IOrderedQueryable<CropYield> GetCropYieldsWithinYearRangeByCrop(int yearStart, int yearEnd, int cropId)
    {

        IOrderedQueryable<CropYield> cropYields = _dataContext.CropYields
            .Include(cy => cy.Country)
            .Include(cy => cy.Crop)
            .Include(cy => cy.Year)
            .Where(cy =>
                cy.Year.Value >= yearStart &&
                cy.Year.Value <= yearEnd &&
                cy.Crop.Id == cropId
            ).OrderBy(cy => cy.Id);

        return cropYields;
    }
}