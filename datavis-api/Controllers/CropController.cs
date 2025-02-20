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

    [HttpGet("cropyields/{countryId}/{cropId}")]
    [ProducesResponseType(200, Type = typeof(ICollection<CropYieldDto>))]
    public IActionResult GetCropYieldsByCountryAndCrop(int countryId, int cropId)
    {

        ICollection<CropYieldDto> cropYieldsDto = _cropService.GetCropYieldsDtoByCountryAndCrop(countryId, cropId);

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        return Ok(cropYieldsDto);
    }

}