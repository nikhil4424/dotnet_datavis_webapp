using datavis_api.Interfaces;
using DatavisApi.Data;
using DatavisApi.Models;
using Microsoft.AspNetCore.Mvc;
namespace datavis_api.Controllers;

[Route("crops")]
[ApiController]
public class CropController : Controller
{
    private readonly ICropRepository _cropRepository;

    public CropController(ICropRepository cropRepository)
    {
        _cropRepository = cropRepository;
    }

    [HttpGet]
    [ProducesResponseType(200, Type = typeof(ICollection<Crop>))]
    public IActionResult GetCrops()
    {
        ICollection<Crop> crops = _cropRepository.GetCrops();

        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        return Ok(crops);
    }
}