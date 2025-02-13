using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DatavisApi.Models;

[Table("year")]
[Index("Value", Name = "year_value_key", IsUnique = true)]
public partial class Year
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("value")]
    public int Value { get; set; }

    [InverseProperty("Year")]
    public virtual ICollection<CropYield> CropYields { get; set; } = new List<CropYield>();
}
