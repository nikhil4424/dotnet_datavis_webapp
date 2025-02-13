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
        return _dataContext.Crops.OrderBy(c => c.Id).ToList();
    }
}