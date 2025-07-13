

using edt_api.models;
using Microsoft.EntityFrameworkCore;

namespace edt_api.config;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }
    
    public DbSet<Responsable> Responsables => Set<Responsable>();
    public DbSet<Edt> Edts => Set<Edt>();
    public DbSet<Salle> Salles => Set<Salle>();
    public DbSet<Disponibilite> Disponibilites => Set<Disponibilite>();
    public DbSet<Enseignant> Enseignants => Set<Enseignant>();
    public DbSet<Matiere> Matieres => Set<Matiere>();
    public DbSet<Mention> Mentions => Set<Mention>();
    public DbSet<Niveau> Niveaux => Set<Niveau>();
    public DbSet<Utilisateur> Utilisateurs => Set<Utilisateur>();
    public DbSet<Authentification> Authentifications => Set<Authentification>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        // modelBuilder.Entity<Edt>()
        //     .HasKey(e => e.numEd);
        //
        // modelBuilder.Entity<Disponibilite>()
        //     .HasKey(d => d.numDispo);
        //
        // modelBuilder.Entity<Matiere>()
        //     .HasKey(m => m.codeMat);
        //
        // modelBuilder.Entity<Utilisateur>()
        //     .HasKey(u => u.idUt);

        modelBuilder.Entity<Utilisateur>()
            .HasDiscriminator<string>("typeUtilisateur")
            .HasValue<Responsable>("Responsable")
            .HasValue<Enseignant>("Enseignant");
        
        modelBuilder.Entity<Authentification>()
            .HasOne( a => a.utilisateur)
            .WithMany(u => u.Authentifications)
            .HasForeignKey(a => a.utilisateurId)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Edt>()
            .HasOne(e => e.responsable)
            .WithMany(r => r.edts)
            .HasForeignKey(e => e.responsableId)
            .OnDelete(DeleteBehavior.Restrict);
        
        modelBuilder.Entity<Edt>()
            .HasMany(e => e.mentions)
            .WithMany(m => m.edts)
            .UsingEntity(j => j.ToTable("edt_mentions"));
        
        modelBuilder.Entity<Edt>()
            .HasOne(e => e.salle)
            .WithMany(s => s.edts)
            .HasForeignKey(e => e.salleId)
            .OnDelete(DeleteBehavior.Restrict);
        
        modelBuilder.Entity<Disponibilite>()
            .HasOne(d => d.enseignant)
            .WithMany(s => s.disponibilites)
            .HasForeignKey(d => d.enseignantCode)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Matiere>()
            .HasOne(m => m.enseignant)
            .WithMany(e => e.matiere)
            .HasForeignKey(m => m.enseignantCode)
            .OnDelete(DeleteBehavior.SetNull);
        
        modelBuilder.Entity<Niveau>()
            .HasOne(n => n.mention)
            .WithMany(m => m.niveau)
            .HasForeignKey(m => m.mentionId)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Matiere>()
            .HasOne(m => m.niveau)
            .WithMany(n => n.matiere)
            .HasForeignKey(m => m.niveauId)
            .OnDelete(DeleteBehavior.Restrict);
        
        modelBuilder.Entity<Matiere>()
            .HasOne(m => m.mention)
            .WithMany()
            .HasForeignKey(m => m.mentionId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}