using DatavisApi.Models;

namespace datavis_api.Interfaces;

public interface ICropRepository
{
    public ICollection<Crop> GetCrops();
}