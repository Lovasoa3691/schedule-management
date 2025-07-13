using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace edt_api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Mentions",
                columns: table => new
                {
                    idMent = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    nomMent = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mentions", x => x.idMent);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Salles",
                columns: table => new
                {
                    idSalle = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    nomSalle = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    capacite = table.Column<int>(type: "int", nullable: false),
                    typeSalle = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Salles", x => x.idSalle);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Utilisateurs",
                columns: table => new
                {
                    idUt = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    nom = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    prenom = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    telephone = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UtilisateurType = table.Column<string>(type: "varchar(13)", maxLength: 13, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    grade = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    fonction = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Utilisateurs", x => x.idUt);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Niveaux",
                columns: table => new
                {
                    idNiv = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    intitule = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    mentionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Niveaux", x => x.idNiv);
                    table.ForeignKey(
                        name: "FK_Niveaux_Mentions_mentionId",
                        column: x => x.mentionId,
                        principalTable: "Mentions",
                        principalColumn: "idMent",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Authentification",
                columns: table => new
                {
                    idAuth = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    email = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    mdp = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    utilisateurId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Authentification", x => x.idAuth);
                    table.ForeignKey(
                        name: "FK_Authentification_Utilisateurs_utilisateurId",
                        column: x => x.utilisateurId,
                        principalTable: "Utilisateurs",
                        principalColumn: "idUt",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Disponibilites",
                columns: table => new
                {
                    numDispo = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    dateDispo = table.Column<DateOnly>(type: "date", nullable: false),
                    hDeb = table.Column<TimeOnly>(type: "time(6)", nullable: false),
                    hFin = table.Column<TimeOnly>(type: "time(6)", nullable: false),
                    enseignantCode = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Disponibilites", x => x.numDispo);
                    table.ForeignKey(
                        name: "FK_Disponibilites_Utilisateurs_enseignantCode",
                        column: x => x.enseignantCode,
                        principalTable: "Utilisateurs",
                        principalColumn: "idUt",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Edts",
                columns: table => new
                {
                    numEd = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    jour = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    hDeb = table.Column<TimeOnly>(type: "time(6)", nullable: false),
                    hFin = table.Column<TimeOnly>(type: "time(6)", nullable: false),
                    responsableId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    salleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Edts", x => x.numEd);
                    table.ForeignKey(
                        name: "FK_Edts_Salles_salleId",
                        column: x => x.salleId,
                        principalTable: "Salles",
                        principalColumn: "idSalle",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Edts_Utilisateurs_responsableId",
                        column: x => x.responsableId,
                        principalTable: "Utilisateurs",
                        principalColumn: "idUt",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Matieres",
                columns: table => new
                {
                    codeMat = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    nomMat = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    nbHor = table.Column<int>(type: "int", nullable: false),
                    coefficient = table.Column<int>(type: "int", nullable: false),
                    enseignantCode = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    niveauId = table.Column<int>(type: "int", nullable: false),
                    mentionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matieres", x => x.codeMat);
                    table.ForeignKey(
                        name: "FK_Matieres_Mentions_mentionId",
                        column: x => x.mentionId,
                        principalTable: "Mentions",
                        principalColumn: "idMent",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Matieres_Niveaux_niveauId",
                        column: x => x.niveauId,
                        principalTable: "Niveaux",
                        principalColumn: "idNiv",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Matieres_Utilisateurs_enseignantCode",
                        column: x => x.enseignantCode,
                        principalTable: "Utilisateurs",
                        principalColumn: "idUt",
                        onDelete: ReferentialAction.SetNull);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "edt_mentions",
                columns: table => new
                {
                    edtsnumEd = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    mentionsidMent = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_edt_mentions", x => new { x.edtsnumEd, x.mentionsidMent });
                    table.ForeignKey(
                        name: "FK_edt_mentions_Edts_edtsnumEd",
                        column: x => x.edtsnumEd,
                        principalTable: "Edts",
                        principalColumn: "numEd",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_edt_mentions_Mentions_mentionsidMent",
                        column: x => x.mentionsidMent,
                        principalTable: "Mentions",
                        principalColumn: "idMent",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Authentification_email",
                table: "Authentification",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Authentification_utilisateurId",
                table: "Authentification",
                column: "utilisateurId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Disponibilites_enseignantCode",
                table: "Disponibilites",
                column: "enseignantCode");

            migrationBuilder.CreateIndex(
                name: "IX_edt_mentions_mentionsidMent",
                table: "edt_mentions",
                column: "mentionsidMent");

            migrationBuilder.CreateIndex(
                name: "IX_Edts_responsableId",
                table: "Edts",
                column: "responsableId");

            migrationBuilder.CreateIndex(
                name: "IX_Edts_salleId",
                table: "Edts",
                column: "salleId");

            migrationBuilder.CreateIndex(
                name: "IX_Matieres_enseignantCode",
                table: "Matieres",
                column: "enseignantCode");

            migrationBuilder.CreateIndex(
                name: "IX_Matieres_mentionId",
                table: "Matieres",
                column: "mentionId");

            migrationBuilder.CreateIndex(
                name: "IX_Matieres_niveauId",
                table: "Matieres",
                column: "niveauId");

            migrationBuilder.CreateIndex(
                name: "IX_Niveaux_mentionId",
                table: "Niveaux",
                column: "mentionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Authentification");

            migrationBuilder.DropTable(
                name: "Disponibilites");

            migrationBuilder.DropTable(
                name: "edt_mentions");

            migrationBuilder.DropTable(
                name: "Matieres");

            migrationBuilder.DropTable(
                name: "Edts");

            migrationBuilder.DropTable(
                name: "Niveaux");

            migrationBuilder.DropTable(
                name: "Salles");

            migrationBuilder.DropTable(
                name: "Utilisateurs");

            migrationBuilder.DropTable(
                name: "Mentions");
        }
    }
}
