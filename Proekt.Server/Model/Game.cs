using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Proekt.Server.Model
{
    public class Game
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string title { get; set; }

        public string description { get; set; }

        public string filePath {  get; set; }

        public int gameHeight { get; set; }

        public int gameWidth { get; set; }

        public string coverPhotoPath { get; set; }

        public string userId {  get; set; }

        [ForeignKey("userId")]
        public ApplicationUser user { get; set; }
    }
}
