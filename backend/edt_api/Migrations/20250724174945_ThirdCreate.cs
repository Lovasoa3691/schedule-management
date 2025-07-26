using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace edt_api.Migrations
{
    /// <inheritdoc />
    public partial class ThirdCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "adresse",
                table: "Utilisateurs",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "genre",
                table: "Utilisateurs",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "anneeId",
                table: "Edts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "semaine",
                table: "Edts",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AnneeScolaires",
                columns: table => new
                {
                    idAnnee = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    dateDebutAnnee = table.Column<DateOnly>(type: "date", nullable: false),
                    dateFinAnnee = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnneeScolaires", x => x.idAnnee);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CalendrierAcademiques",
                columns: table => new
                {
                    idCal = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    dateDebut = table.Column<DateOnly>(type: "date", nullable: false),
                    dateFin = table.Column<DateOnly>(type: "date", nullable: false),
                    typeCal = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    descriptionCal = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    responsableId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CalendrierAcademiques", x => x.idCal);
                    table.ForeignKey(
                        name: "FK_CalendrierAcademiques_Utilisateurs_responsableId",
                        column: x => x.responsableId,
                        principalTable: "Utilisateurs",
                        principalColumn: "idUt",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Enseignements",
                columns: table => new
                {
                    matiereId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    enseignantId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    heureEffectue = table.Column<double>(type: "double", nullable: false),
                    ststusEnseignement = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enseignements", x => new { x.enseignantId, x.matiereId });
                    table.ForeignKey(
                        name: "FK_Enseignements_Matieres_enseignantId",
                        column: x => x.enseignantId,
                        principalTable: "Matieres",
                        principalColumn: "codeMat",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Enseignements_Utilisateurs_matiereId",
                        column: x => x.matiereId,
                        principalTable: "Utilisateurs",
                        principalColumn: "idUt",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    idMes = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    dateMes = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    texte = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    statusMes = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    enseignantId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    responsableId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.idMes);
                    table.ForeignKey(
                        name: "FK_Messages_Utilisateurs_enseignantId",
                        column: x => x.enseignantId,
                        principalTable: "Utilisateurs",
                        principalColumn: "idUt",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Messages_Utilisateurs_responsableId",
                        column: x => x.responsableId,
                        principalTable: "Utilisateurs",
                        principalColumn: "idUt",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Edts_anneeId",
                table: "Edts",
                column: "anneeId");

            migrationBuilder.CreateIndex(
                name: "IX_CalendrierAcademiques_responsableId",
                table: "CalendrierAcademiques",
                column: "responsableId");

            migrationBuilder.CreateIndex(
                name: "IX_Enseignements_matiereId",
                table: "Enseignements",
                column: "matiereId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_enseignantId",
                table: "Messages",
                column: "enseignantId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_responsableId",
                table: "Messages",
                column: "responsableId");

            migrationBuilder.AddForeignKey(
                name: "FK_Edts_AnneeScolaires_anneeId",
                table: "Edts",
                column: "anneeId",
                principalTable: "AnneeScolaires",
                principalColumn: "idAnnee",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Edts_AnneeScolaires_anneeId",
                table: "Edts");

            migrationBuilder.DropTable(
                name: "AnneeScolaires");

            migrationBuilder.DropTable(
                name: "CalendrierAcademiques");

            migrationBuilder.DropTable(
                name: "Enseignements");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Edts_anneeId",
                table: "Edts");

            migrationBuilder.DropColumn(
                name: "adresse",
                table: "Utilisateurs");

            migrationBuilder.DropColumn(
                name: "genre",
                table: "Utilisateurs");

            migrationBuilder.DropColumn(
                name: "anneeId",
                table: "Edts");

            migrationBuilder.DropColumn(
                name: "semaine",
                table: "Edts");
        }
    }
}
