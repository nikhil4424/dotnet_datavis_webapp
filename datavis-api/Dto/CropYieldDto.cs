using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace datavis_api.Dto
{
    public class CropYieldDto
    {
        public int Id { get; set; }

        public string Country { get; set; }

        public string Crop { get; set; }

        public int Year { get; set; }

        public decimal? Value { get; set; }
    }
}