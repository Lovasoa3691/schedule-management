using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace edt_api.Migrations
{
    /// <inheritdoc />
    public partial class SecondCtreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enseignements_Matieres_enseignantId",
                table: "Enseignements");

            migrationBuilder.DropForeignKey(
                name: "FK_Enseignements_Utilisateurs_matiereId",
                table: "Enseignements");

            migrationBuilder.AddForeignKey(
                name: "FK_Enseignements_Matieres_matiereId",
                table: "Enseignements",
                column: "matiereId",
                principalTable: "Matieres",
                principalColumn: "codeMat",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Enseignements_Utilisateurs_enseignantId",
                table: "Enseignements",
                column: "enseignantId",
                principalTable: "Utilisateurs",
                principalColumn: "idUt",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enseignements_Matieres_matiereId",
                table: "Enseignements");

            migrationBuilder.DropForeignKey(
                name: "FK_Enseignements_Utilisateurs_enseignantId",
                table: "Enseignements");

            migrationBuilder.AddForeignKey(
                name: "FK_Enseignements_Matieres_enseignantId",
                table: "Enseignements",
                column: "enseignantId",
                principalTable: "Matieres",
                principalColumn: "codeMat",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Enseignements_Utilisateurs_matiereId",
                table: "Enseignements",
                column: "matiereId",
                principalTable: "Utilisateurs",
                principalColumn: "idUt",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
