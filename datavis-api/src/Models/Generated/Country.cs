using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DatavisApi.Models;

[Table("country")]
[Index("Name", Name = "country_name_key", IsUnique = true)]
public partial class Country
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    public string Name { get; set; } = null!;

    [InverseProperty("Country")]
    public virtual ICollection<CropYield> CropYields { get; set; } = new List<CropYield>();
}
