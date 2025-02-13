namespace datavis_api.Model;

public partial class CropYield
{
    public int Id { get; set; }

    public int CountryId { get; set; }

    public int CropId { get; set; }

    public int YearId { get; set; }

    //  crop yield value in tonnes/hectare
    public decimal? Value { get; set; }
}
