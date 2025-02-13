using Microsoft.EntityFrameworkCore;

namespace datavis_api.Model;

public partial class CropYieldsOwidContext : DbContext
{
    public CropYieldsOwidContext()
    {
    }

    public CropYieldsOwidContext(DbContextOptions<CropYieldsOwidContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Country> Countries { get; set; }

    public virtual DbSet<Crop> Crops { get; set; }

    public virtual DbSet<CropYield> CropYields { get; set; }

    public virtual DbSet<Year> Years { get; set; }

    public virtual DbSet<Yield> Yields { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Database=crop_yields_owid;Username=postgres;Password=postgres");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Country>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("country_pkey");

            entity.ToTable("country");

            entity.HasIndex(e => e.Name, "country_name_key").IsUnique();

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.Name).HasColumnName("name");
        });

        modelBuilder.Entity<Crop>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("crop_pkey");

            entity.ToTable("crop");

            entity.HasIndex(e => e.Name, "crop_name_key").IsUnique();

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.Name).HasColumnName("name");
        });

        modelBuilder.Entity<CropYield>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("crop_yield_pkey");

            entity.ToTable("crop_yield");

            entity.HasIndex(e => new { e.CountryId, e.CropId, e.YearId }, "crop_yield_country_id_crop_id_year_id_key").IsUnique();

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.CountryId).HasColumnName("country_id");
            entity.Property(e => e.CropId).HasColumnName("crop_id");
            entity.Property(e => e.Value).HasColumnName("value");
            entity.Property(e => e.YearId).HasColumnName("year_id");
        });

        modelBuilder.Entity<Year>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("year_pkey");

            entity.ToTable("year");

            entity.HasIndex(e => e.Value, "year_value_key").IsUnique();

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.Value).HasColumnName("value");
        });

        modelBuilder.Entity<Yield>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("yields");

            entity.Property(e => e.Country).HasColumnName("country");
            entity.Property(e => e.Crop).HasColumnName("crop");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Year).HasColumnName("year");
            entity.Property(e => e.Yield1).HasColumnName("yield");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
