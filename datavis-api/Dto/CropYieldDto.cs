namespace DatavisApi.Dto
{
    public class CropYieldDto
    {
        public int Id { get; set; }

        public string Country { get; set; }

        public string Crop { get; set; }

        public int Year { get; set; }

        public decimal? Value { get; set; }

        public CropYieldDto(int id, string country, string crop, int year, decimal? value)
        {
            Id = id;
            Country = country;
            Crop = crop;
            Year = year;
            Value = value;
        }

    }
}