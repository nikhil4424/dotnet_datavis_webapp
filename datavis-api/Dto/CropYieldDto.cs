namespace DatavisApi.Dto
{
    public class CropYieldDto
    {
        public int Id { get; set; }

        public string Country { get; set; } = null!;

        public string Crop { get; set; } = null!;

        public int Year { get; set; }

        public decimal? Value { get; set; }
    }
}