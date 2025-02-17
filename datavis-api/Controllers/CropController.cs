using AutoMapper;
using datavis_api.Dto;
using datavis_api.Interfaces;
using DatavisApi.Data;
using DatavisApi.Models;
using Microsoft.AspNetCore.Mvc;
namespace datavis_api.Controllers;

[Route("crop-api")]
[ApiController]
public class CropController : ControllerBase
{
    private readonly ICropRepository _cropRepository;
    private readonly IMapper _mapper;

    public CropController(ICropRepository cropRepository, IMapper mapper)
    {
        _cropRepository = cropRepository;
        _mapper = mapper;
    }

    [HttpGet("crops")]
    [ProducesResponseType(200, Type = typeof(ICollection<CropDto>))]
    public IActionResult GetCrops()
    {
        List<CropDto> crops = _mapper.Map<List<CropDto>>(_cropRepository.GetCrops());

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        return Ok(crops);
    }

    // TODO: put in separate countries controller
    [HttpGet("countries")]
    [ProducesResponseType(200, Type = typeof(ICollection<CountryDto>))]
    public IActionResult GetCountries()
    {
        List<CountryDto> countries = _mapper.Map<List<CountryDto>>(_cropRepository.GetCountries());

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        return Ok(countries);
    }

    // TODO: put in separate years controller
    [HttpGet("years")]
    [ProducesResponseType(200, Type = typeof(ICollection<YearDto>))]
    public IActionResult GetYears()
    {
        List<YearDto> years = _mapper.Map<List<YearDto>>(_cropRepository.GetYears());

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        return Ok(years);
    }

    [HttpGet("cropyields/{countryId}/{cropId}")]
    [ProducesResponseType(200, Type = typeof(ICollection<CropYieldDto>))]
    public IActionResult GetCropYieldsByCountryAndCrop(int countryId, int cropId)
    {
        ICollection<CropYieldDto> cropYields = _cropRepository.GetCropYieldsByCountryAndCrop(countryId, cropId);

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        return Ok(cropYields);
    }

}