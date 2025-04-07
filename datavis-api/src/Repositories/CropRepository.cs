using DatavisApi.Interfaces;
using DatavisApi.Data;
using DatavisApi.Models;
using Microsoft.EntityFrameworkCore;

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

    public int GetMinYear()
    {
        return _dataContext.Years.Min(y => y.Value);
    }

    public int GetMaxYear()
    {
        return _dataContext.Years.Max(y => y.Value);
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
            ).OrderByDescending(cy => cy.Id);

        return cropYields;
    }

    public IQueryable<CountryYieldSum> GetCountryYieldSumByYearRangeAndCrop(int yearStart, int yearEnd, int cropId)
    {
        string sqlQuery =
            $"""        
            WITH top_countries AS (
                SELECT country.name, SUM(cy.value) AS total_yield
                FROM crop_yield cy
                    JOIN year ON year.id = cy.year_id
                    JOIN crop ON crop.id = cy.crop_id
                    JOIN country ON country.id = cy.country_id
                WHERE
                    crop.id = {cropId} AND
                    year.value BETWEEN {yearStart} AND {yearEnd}
                GROUP BY country.name
                ORDER BY total_yield DESC
                LIMIT 14
            ),
            other_countries AS (
                SELECT SUM(cy.value) AS total_yield
                FROM crop_yield cy
                    JOIN year ON year.id = cy.year_id
                    JOIN crop ON crop.id = cy.crop_id
                    JOIN country ON country.id = cy.country_id
                WHERE
                    crop.id = {cropId} AND
                    year.value BETWEEN {yearStart} AND {yearEnd} AND
                    country.name NOT IN (SELECT name FROM top_countries)
            )
            SELECT name, total_yield
            FROM top_countries
            UNION ALL
            SELECT 'Other', total_yield
            FROM other_countries;
            """;

        IQueryable<CountryYieldSum> sumYields = _dataContext.Database.SqlQueryRaw<CountryYieldSum>(sqlQuery);

        return sumYields;
    }
}