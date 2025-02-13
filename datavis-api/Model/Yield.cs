using System;
using System.Collections.Generic;

namespace datavis_api.Model;

public partial class Yield
{
    public int? Id { get; set; }

    public string? Crop { get; set; }

    public string? Country { get; set; }

    public int? Year { get; set; }

    public decimal? Yield1 { get; set; }
}
