using DatavisApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DatavisApi.Data;

public partial class CropDataContext : DbContext
{
    public CropDataContext(DbContextOptions<CropDataContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Country> Countries { get; set; }

    public virtual DbSet<Crop> Crops { get; set; }

    public virtual DbSet<CropYield> CropYields { get; set; }

    public virtual DbSet<Year> Years { get; set; }

    public virtual DbSet<YieldsView> YieldsViews { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Country>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("country_pkey");

            entity.Property(e => e.Id).UseIdentityAlwaysColumn();
        });

        modelBuilder.Entity<Crop>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("crop_pkey");

            entity.Property(e => e.Id).UseIdentityAlwaysColumn();
        });

        modelBuilder.Entity<CropYield>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("crop_yield_pkey");

            entity.Property(e => e.Id).UseIdentityAlwaysColumn();

            entity.HasOne(d => d.Country).WithMany(p => p.CropYields).HasConstraintName("crop_yield_country_id_fkey");

            entity.HasOne(d => d.Crop).WithMany(p => p.CropYields).HasConstraintName("crop_yield_crop_id_fkey");

            entity.HasOne(d => d.Year).WithMany(p => p.CropYields).HasConstraintName("crop_yield_year_id_fkey");
        });

        modelBuilder.Entity<Year>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("year_pkey");

            entity.Property(e => e.Id).UseIdentityAlwaysColumn();
        });

        modelBuilder.Entity<YieldsView>(entity =>
        {
            entity.ToView("yields_view");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
