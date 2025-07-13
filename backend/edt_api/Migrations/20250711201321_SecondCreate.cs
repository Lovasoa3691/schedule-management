using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace edt_api.Migrations
{
    /// <inheritdoc />
    public partial class SecondCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Authentification_Utilisateurs_utilisateurId",
                table: "Authentification");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Authentification",
                table: "Authentification");

            migrationBuilder.DropIndex(
                name: "IX_Authentification_email",
                table: "Authentification");

            migrationBuilder.DropIndex(
                name: "IX_Authentification_utilisateurId",
                table: "Authentification");

            migrationBuilder.RenameTable(
                name: "Authentification",
                newName: "Authentifications");

            migrationBuilder.RenameColumn(
                name: "UtilisateurType",
                table: "Utilisateurs",
                newName: "typeUtilisateur");

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "Authentifications",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Authentifications",
                table: "Authentifications",
                column: "idAuth");

            migrationBuilder.CreateIndex(
                name: "IX_Authentifications_utilisateurId",
                table: "Authentifications",
                column: "utilisateurId");

            migrationBuilder.AddForeignKey(
                name: "FK_Authentifications_Utilisateurs_utilisateurId",
                table: "Authentifications",
                column: "utilisateurId",
                principalTable: "Utilisateurs",
                principalColumn: "idUt",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Authentifications_Utilisateurs_utilisateurId",
                table: "Authentifications");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Authentifications",
                table: "Authentifications");

            migrationBuilder.DropIndex(
                name: "IX_Authentifications_utilisateurId",
                table: "Authentifications");

            migrationBuilder.RenameTable(
                name: "Authentifications",
                newName: "Authentification");

            migrationBuilder.RenameColumn(
                name: "typeUtilisateur",
                table: "Utilisateurs",
                newName: "UtilisateurType");

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "Authentification",
                type: "varchar(255)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Authentification",
                table: "Authentification",
                column: "idAuth");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Authentification_Utilisateurs_utilisateurId",
                table: "Authentification",
                column: "utilisateurId",
                principalTable: "Utilisateurs",
                principalColumn: "idUt",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
