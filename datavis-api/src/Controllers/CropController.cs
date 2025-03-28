using DatavisApi.Dto;
using Microsoft.AspNetCore.Mvc;
using DatavisApi.Services;

namespace DatavisApi.Controllers;

[Route("crop-api")]
[ApiController]
public class CropController : ControllerBase
{
    private CropService _cropService;

    public CropController(CropService cropService)
    {
        _cropService = cropService;
    }

    [HttpGet("countries")]
    [ProducesResponseType(200, Type = typeof(ICollection<CountryDto>))]
    public IActionResult GetCountries()
    {
        ICollection<CountryDto> countriesDto = _cropService.GetCountriesDto();

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        return Ok(countriesDto);
    }

    [HttpGet("crops")]
    [ProducesResponseType(200, Type = typeof(ICollection<CropDto>))]
    public IActionResult GetCrops()
    {
        ICollection<CropDto> cropsDto = _cropService.GetCropsDto();

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        return Ok(cropsDto);
    }


    [HttpGet("years")]
    [ProducesResponseType(200, Type = typeof(ICollection<YearDto>))]
    public IActionResult GetYears()
    {
        ICollection<YearDto> yearsDto = _cropService.GetYearsDto();

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        return Ok(yearsDto);
    }

    // Endpoint for crop yield line chart data; returns crop yield data for given countries and crop
    [HttpGet("cropyields/countries/crop")]
    [ProducesResponseType(200, Type = typeof(ICollection<CropYieldDto>))]
    public IActionResult GetCropYieldsByCountriesAndCrop
    (
        [FromQuery] int[] countryIds,
        [FromQuery] int cropId
    )
    {

        ICollection<CropYieldDto> cropYieldsDto = _cropService.GetCropYieldsDtoByCountriesAndCrop(countryIds, cropId);

        if (!ModelState.IsValid) return BadRequest(ModelState);

        return Ok(cropYieldsDto);
    }

    // Endpoint for crop yield pie chart data
    [HttpGet("cropyields/yearrange/crop")]
    [ProducesResponseType(200, Type = typeof(ICollection<CropYieldDto>))]
    public IActionResult GetCropYieldsWithinYearRangeByCrop
    (
        [FromQuery] int yearStart,
        [FromQuery] int yearEnd,
        [FromQuery] int cropId
    )
    {
        ICollection<CropYieldDto> cropYieldsDto = _cropService.GetCropYieldsDtoWithinYearRangeByCrop(yearStart, yearEnd, cropId);

        if (!ModelState.IsValid) return BadRequest(ModelState);

        return Ok(cropYieldsDto);
    }
}