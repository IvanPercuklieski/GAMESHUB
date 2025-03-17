using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Proekt.Server.Migrations
{
    /// <inheritdoc />
    public partial class coverPhotosadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "coverPhotoPath",
                table: "Games",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "coverPhotoPath",
                table: "Games");
        }
    }
}
