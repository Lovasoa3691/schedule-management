using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace edt_api.Migrations
{
    /// <inheritdoc />
    public partial class FourthCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Matieres_Mentions_mentionId",
                table: "Matieres");

            migrationBuilder.DropForeignKey(
                name: "FK_Matieres_Niveaux_niveauId",
                table: "Matieres");

            migrationBuilder.DropIndex(
                name: "IX_Matieres_mentionId",
                table: "Matieres");

            migrationBuilder.DropIndex(
                name: "IX_Matieres_niveauId",
                table: "Matieres");

            migrationBuilder.DropColumn(
                name: "mentionId",
                table: "Matieres");

            migrationBuilder.DropColumn(
                name: "niveauId",
                table: "Matieres");

            migrationBuilder.CreateTable(
                name: "MatiereMentions",
                columns: table => new
                {
                    matiereId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    mentionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatiereMentions", x => new { x.matiereId, x.mentionId });
                    table.ForeignKey(
                        name: "FK_MatiereMentions_Matieres_matiereId",
                        column: x => x.matiereId,
                        principalTable: "Matieres",
                        principalColumn: "codeMat",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MatiereMentions_Mentions_mentionId",
                        column: x => x.mentionId,
                        principalTable: "Mentions",
                        principalColumn: "idMent",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MatiereNiveaux",
                columns: table => new
                {
                    matiereId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    niveauId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatiereNiveaux", x => new { x.matiereId, x.niveauId });
                    table.ForeignKey(
                        name: "FK_MatiereNiveaux_Matieres_matiereId",
                        column: x => x.matiereId,
                        principalTable: "Matieres",
                        principalColumn: "codeMat",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MatiereNiveaux_Niveaux_niveauId",
                        column: x => x.niveauId,
                        principalTable: "Niveaux",
                        principalColumn: "idNiv",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_MatiereMentions_mentionId",
                table: "MatiereMentions",
                column: "mentionId");

            migrationBuilder.CreateIndex(
                name: "IX_MatiereNiveaux_niveauId",
                table: "MatiereNiveaux",
                column: "niveauId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MatiereMentions");

            migrationBuilder.DropTable(
                name: "MatiereNiveaux");

            migrationBuilder.AddColumn<int>(
                name: "mentionId",
                table: "Matieres",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "niveauId",
                table: "Matieres",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Matieres_mentionId",
                table: "Matieres",
                column: "mentionId");

            migrationBuilder.CreateIndex(
                name: "IX_Matieres_niveauId",
                table: "Matieres",
                column: "niveauId");

            migrationBuilder.AddForeignKey(
                name: "FK_Matieres_Mentions_mentionId",
                table: "Matieres",
                column: "mentionId",
                principalTable: "Mentions",
                principalColumn: "idMent",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Matieres_Niveaux_niveauId",
                table: "Matieres",
                column: "niveauId",
                principalTable: "Niveaux",
                principalColumn: "idNiv",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
