using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DatavisApi.Models;

[Table("crop")]
[Index("Name", Name = "crop_name_key", IsUnique = true)]
public partial class Crop
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    public string Name { get; set; } = null!;

    [InverseProperty("Crop")]
    public virtual ICollection<CropYield> CropYields { get; set; } = new List<CropYield>();
}
