using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DatavisApi.Models;

[Keyless]
public partial class YieldsView
{
    [Column("id")]
    public int? Id { get; set; }

    [Column("crop")]
    public string? Crop { get; set; }

    [Column("country")]
    public string? Country { get; set; }

    [Column("year")]
    public int? Year { get; set; }

    [Column("yield")]
    public decimal? Yield { get; set; }
}
