﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using edt_api.config;

#nullable disable

namespace edt_api.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250725062502_FourthCreate")]
    partial class FourthCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.18")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("edt_api.models.AnneeScolaire", b =>
                {
                    b.Property<int>("idAnnee")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("idAnnee"));

                    b.Property<DateOnly>("dateDebutAnnee")
                        .HasColumnType("date");

                    b.Property<DateOnly>("dateFinAnnee")
                        .HasColumnType("date");

                    b.HasKey("idAnnee");

                    b.ToTable("AnneeScolaires");
                });

            modelBuilder.Entity("edt_api.models.Authentification", b =>
                {
                    b.Property<string>("idAuth")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("mdp")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("utilisateurId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("idAuth");

                    b.HasIndex("utilisateurId");

                    b.ToTable("Authentifications");
                });

            modelBuilder.Entity("edt_api.models.CalendrierAcademique", b =>
                {
                    b.Property<int>("idCal")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("idCal"));

                    b.Property<DateOnly>("dateDebut")
                        .HasColumnType("date");

                    b.Property<DateOnly>("dateFin")
                        .HasColumnType("date");

                    b.Property<string>("descriptionCal")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("responsableId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("typeCal")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("idCal");

                    b.HasIndex("responsableId");

                    b.ToTable("CalendrierAcademiques");
                });

            modelBuilder.Entity("edt_api.models.Disponibilite", b =>
                {
                    b.Property<string>("numDispo")
                        .HasColumnType("varchar(255)");

                    b.Property<DateOnly>("dateDispo")
                        .HasColumnType("date");

                    b.Property<string>("enseignantId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<TimeOnly>("hDeb")
                        .HasColumnType("time(6)");

                    b.Property<TimeOnly>("hFin")
                        .HasColumnType("time(6)");

                    b.HasKey("numDispo");

                    b.HasIndex("enseignantId");

                    b.ToTable("Disponibilites");
                });

            modelBuilder.Entity("edt_api.models.Edt", b =>
                {
                    b.Property<string>("numEd")
                        .HasColumnType("varchar(255)");

                    b.Property<int>("anneeId")
                        .HasColumnType("int");

                    b.Property<string>("disponibilite")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("enseignantId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<TimeOnly>("hDeb")
                        .HasColumnType("time(6)");

                    b.Property<TimeOnly>("hFin")
                        .HasColumnType("time(6)");

                    b.Property<DateOnly>("jour")
                        .HasColumnType("date");

                    b.Property<string>("matiereId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<int>("mentionId")
                        .HasColumnType("int");

                    b.Property<int>("niveauId")
                        .HasColumnType("int");

                    b.Property<string>("responsableId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<int>("salleId")
                        .HasColumnType("int");

                    b.Property<string>("semaine")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("type")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("numEd");

                    b.HasIndex("anneeId");

                    b.HasIndex("enseignantId");

                    b.HasIndex("matiereId");

                    b.HasIndex("mentionId");

                    b.HasIndex("niveauId");

                    b.HasIndex("responsableId");

                    b.HasIndex("salleId");

                    b.ToTable("Edts");
                });

            modelBuilder.Entity("edt_api.models.Enseignement", b =>
                {
                    b.Property<string>("enseignantId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("matiereId")
                        .HasColumnType("varchar(255)");

                    b.Property<double>("heureEffectue")
                        .HasColumnType("double");

                    b.Property<string>("ststusEnseignement")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("enseignantId", "matiereId");

                    b.HasIndex("matiereId");

                    b.ToTable("Enseignements");
                });

            modelBuilder.Entity("edt_api.models.Matiere", b =>
                {
                    b.Property<string>("codeMat")
                        .HasColumnType("varchar(255)");

                    b.Property<int>("coefficient")
                        .HasColumnType("int");

                    b.Property<string>("enseignantId")
                        .HasColumnType("varchar(255)");

                    b.Property<int>("nbHor")
                        .HasColumnType("int");

                    b.Property<string>("nomMat")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("status")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("codeMat");

                    b.HasIndex("enseignantId");

                    b.ToTable("Matieres");
                });

            modelBuilder.Entity("edt_api.models.MatiereMention", b =>
                {
                    b.Property<string>("matiereId")
                        .HasColumnType("varchar(255)");

                    b.Property<int>("mentionId")
                        .HasColumnType("int");

                    b.HasKey("matiereId", "mentionId");

                    b.HasIndex("mentionId");

                    b.ToTable("MatiereMentions");
                });

            modelBuilder.Entity("edt_api.models.MatiereNiveau", b =>
                {
                    b.Property<string>("matiereId")
                        .HasColumnType("varchar(255)");

                    b.Property<int>("niveauId")
                        .HasColumnType("int");

                    b.HasKey("matiereId", "niveauId");

                    b.HasIndex("niveauId");

                    b.ToTable("MatiereNiveaux");
                });

            modelBuilder.Entity("edt_api.models.Mention", b =>
                {
                    b.Property<int>("idMent")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("idMent"));

                    b.Property<string>("nomMent")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("idMent");

                    b.ToTable("Mentions");
                });

            modelBuilder.Entity("edt_api.models.Message", b =>
                {
                    b.Property<string>("idMes")
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime>("dateMes")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("enseignantId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("responsableId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("statusMes")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("texte")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("idMes");

                    b.HasIndex("enseignantId");

                    b.HasIndex("responsableId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("edt_api.models.Niveau", b =>
                {
                    b.Property<int>("idNiv")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("idNiv"));

                    b.Property<string>("intitule")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("idNiv");

                    b.ToTable("Niveaux");
                });

            modelBuilder.Entity("edt_api.models.Salle", b =>
                {
                    b.Property<int>("idSalle")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("idSalle"));

                    b.Property<int>("capacite")
                        .HasColumnType("int");

                    b.Property<string>("localisation")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("nomSalle")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("typeSalle")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("idSalle");

                    b.ToTable("Salles");
                });

            modelBuilder.Entity("edt_api.models.Utilisateur", b =>
                {
                    b.Property<string>("idUt")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("adresse")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("genre")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("nom")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("prenom")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("telephone")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("typeUtilisateur")
                        .IsRequired()
                        .HasMaxLength(13)
                        .HasColumnType("varchar(13)");

                    b.HasKey("idUt");

                    b.ToTable("Utilisateurs");

                    b.HasDiscriminator<string>("typeUtilisateur").HasValue("Utilisateur");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("edt_api.models.Enseignant", b =>
                {
                    b.HasBaseType("edt_api.models.Utilisateur");

                    b.Property<string>("grade")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasDiscriminator().HasValue("Enseignant");
                });

            modelBuilder.Entity("edt_api.models.Responsable", b =>
                {
                    b.HasBaseType("edt_api.models.Utilisateur");

                    b.Property<string>("fonction")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasDiscriminator().HasValue("Responsable");
                });

            modelBuilder.Entity("edt_api.models.Authentification", b =>
                {
                    b.HasOne("edt_api.models.Utilisateur", "utilisateur")
                        .WithMany("Authentifications")
                        .HasForeignKey("utilisateurId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("utilisateur");
                });

            modelBuilder.Entity("edt_api.models.CalendrierAcademique", b =>
                {
                    b.HasOne("edt_api.models.Responsable", "responsable")
                        .WithMany("calendrierAcademies")
                        .HasForeignKey("responsableId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("responsable");
                });

            modelBuilder.Entity("edt_api.models.Disponibilite", b =>
                {
                    b.HasOne("edt_api.models.Enseignant", "enseignant")
                        .WithMany("disponibilites")
                        .HasForeignKey("enseignantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("enseignant");
                });

            modelBuilder.Entity("edt_api.models.Edt", b =>
                {
                    b.HasOne("edt_api.models.AnneeScolaire", "anneeScolaire")
                        .WithMany("edts")
                        .HasForeignKey("anneeId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("edt_api.models.Enseignant", "enseignant")
                        .WithMany("edts")
                        .HasForeignKey("enseignantId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("edt_api.models.Matiere", "matiere")
                        .WithMany("edts")
                        .HasForeignKey("matiereId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("edt_api.models.Mention", "mention")
                        .WithMany("edts")
                        .HasForeignKey("mentionId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("edt_api.models.Niveau", "niveau")
                        .WithMany("edts")
                        .HasForeignKey("niveauId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("edt_api.models.Responsable", "responsable")
                        .WithMany("edts")
                        .HasForeignKey("responsableId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("edt_api.models.Salle", "salle")
                        .WithMany("edts")
                        .HasForeignKey("salleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("anneeScolaire");

                    b.Navigation("enseignant");

                    b.Navigation("matiere");

                    b.Navigation("mention");

                    b.Navigation("niveau");

                    b.Navigation("responsable");

                    b.Navigation("salle");
                });

            modelBuilder.Entity("edt_api.models.Enseignement", b =>
                {
                    b.HasOne("edt_api.models.Matiere", "matiere")
                        .WithMany("enseignements")
                        .HasForeignKey("enseignantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("edt_api.models.Enseignant", "enseignant")
                        .WithMany("enseignements")
                        .HasForeignKey("matiereId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("enseignant");

                    b.Navigation("matiere");
                });

            modelBuilder.Entity("edt_api.models.Matiere", b =>
                {
                    b.HasOne("edt_api.models.Enseignant", "enseignant")
                        .WithMany("matiere")
                        .HasForeignKey("enseignantId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("enseignant");
                });

            modelBuilder.Entity("edt_api.models.MatiereMention", b =>
                {
                    b.HasOne("edt_api.models.Matiere", "matiere")
                        .WithMany("matiereMention")
                        .HasForeignKey("matiereId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("edt_api.models.Mention", "mention")
                        .WithMany("matiereMention")
                        .HasForeignKey("mentionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("matiere");

                    b.Navigation("mention");
                });

            modelBuilder.Entity("edt_api.models.MatiereNiveau", b =>
                {
                    b.HasOne("edt_api.models.Matiere", "matiere")
                        .WithMany("matiereNiveau")
                        .HasForeignKey("matiereId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("edt_api.models.Niveau", "niveau")
                        .WithMany("matiereNiveau")
                        .HasForeignKey("niveauId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("matiere");

                    b.Navigation("niveau");
                });

            modelBuilder.Entity("edt_api.models.Message", b =>
                {
                    b.HasOne("edt_api.models.Enseignant", "enseignant")
                        .WithMany("messages")
                        .HasForeignKey("enseignantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("edt_api.models.Responsable", "responsable")
                        .WithMany("messages")
                        .HasForeignKey("responsableId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("enseignant");

                    b.Navigation("responsable");
                });

            modelBuilder.Entity("edt_api.models.AnneeScolaire", b =>
                {
                    b.Navigation("edts");
                });

            modelBuilder.Entity("edt_api.models.Matiere", b =>
                {
                    b.Navigation("edts");

                    b.Navigation("enseignements");

                    b.Navigation("matiereMention");

                    b.Navigation("matiereNiveau");
                });

            modelBuilder.Entity("edt_api.models.Mention", b =>
                {
                    b.Navigation("edts");

                    b.Navigation("matiereMention");
                });

            modelBuilder.Entity("edt_api.models.Niveau", b =>
                {
                    b.Navigation("edts");

                    b.Navigation("matiereNiveau");
                });

            modelBuilder.Entity("edt_api.models.Salle", b =>
                {
                    b.Navigation("edts");
                });

            modelBuilder.Entity("edt_api.models.Utilisateur", b =>
                {
                    b.Navigation("Authentifications");
                });

            modelBuilder.Entity("edt_api.models.Enseignant", b =>
                {
                    b.Navigation("disponibilites");

                    b.Navigation("edts");

                    b.Navigation("enseignements");

                    b.Navigation("matiere");

                    b.Navigation("messages");
                });

            modelBuilder.Entity("edt_api.models.Responsable", b =>
                {
                    b.Navigation("calendrierAcademies");

                    b.Navigation("edts");

                    b.Navigation("messages");
                });
#pragma warning restore 612, 618
        }
    }
}
