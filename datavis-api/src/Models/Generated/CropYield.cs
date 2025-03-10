using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DatavisApi.Models;

[Table("crop_yield")]
[Index("CountryId", "CropId", "YearId", Name = "crop_yield_country_id_crop_id_year_id_key", IsUnique = true)]
public partial class CropYield
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("country_id")]
    public int CountryId { get; set; }

    [Column("crop_id")]
    public int CropId { get; set; }

    [Column("year_id")]
    public int YearId { get; set; }

    [Column("value")]
    public decimal? Value { get; set; }

    [ForeignKey("CountryId")]
    [InverseProperty("CropYields")]
    public virtual Country Country { get; set; } = null!;

    [ForeignKey("CropId")]
    [InverseProperty("CropYields")]
    public virtual Crop Crop { get; set; } = null!;

    [ForeignKey("YearId")]
    [InverseProperty("CropYields")]
    public virtual Year Year { get; set; } = null!;
}
