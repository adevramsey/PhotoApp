using Microsoft.EntityFrameworkCore;
using Photography.API.Models;

namespace Photography.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Photo> Photos => Set<Photo>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Photo entity configuration
        modelBuilder.Entity<Photo>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Title)
                .IsRequired()
                .HasMaxLength(200);
            
            entity.Property(e => e.Description)
                .HasMaxLength(1000);
            
            entity.Property(e => e.Category)
                .HasMaxLength(50);
            
            entity.Property(e => e.Url)
                .IsRequired()
                .HasMaxLength(500);
            
            entity.Property(e => e.StorageKey)
                .IsRequired()
                .HasMaxLength(500);
            
            entity.Property(e => e.MimeType)
                .HasMaxLength(100);
            
            // Indexes
            entity.HasIndex(e => e.UserId);
            entity.HasIndex(e => e.Category);
            entity.HasIndex(e => e.CreatedAt);
            
            // Relationships
            entity.HasOne(e => e.User)
                .WithMany(u => u.Photos)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // User entity configuration
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(256);
            
            entity.Property(e => e.Name)
                .HasMaxLength(100);
            
            entity.HasIndex(e => e.Email)
                .IsUnique();
        });
    }
}