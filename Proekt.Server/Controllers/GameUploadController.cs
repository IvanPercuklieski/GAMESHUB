using Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proekt.Server.Model;
using System;
using System.IO;
using System.IO.Compression;
using System.Threading.Tasks;

namespace Proekt.Server.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class GameUploadController : ControllerBase
    {
        private readonly string gamesPath = Path.Combine(Directory.GetCurrentDirectory(), "Games");
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly AppDbContext _context;

        public GameUploadController(UserManager<ApplicationUser> userManager, AppDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet("getgames")]
        public async Task<IActionResult> GetGames()
        {
            var games = await _context.Games.ToListAsync();
            return Ok(games);
        }

        [HttpPost("gameupload")]
        [Authorize]
        public async Task<IActionResult> UploadGame(IFormFile file, IFormFile coverPhoto, [FromForm] string title, [FromForm] string description, [FromForm] int gameHeight, [FromForm] int gameWidth)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No game file uploaded");

            if (coverPhoto == null || coverPhoto.Length == 0)
                return BadRequest("No cover photo uploaded");

            if (Path.GetExtension(file.FileName).ToLower() != ".zip")
                return BadRequest("Only ZIP files are allowed!");


            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return Unauthorized("User not found");

            string userEmailPrefix = user.Email.Split('@')[0];
            string userFolder = Path.Combine(gamesPath, userEmailPrefix);
            if (!Directory.Exists(userFolder))
            {
                Directory.CreateDirectory(userFolder);
            }

           
            string gameFolder = Path.Combine(userFolder, title); 
            if (!Directory.Exists(gameFolder))
            {
                Directory.CreateDirectory(gameFolder);
            }

   
            string gameFilesFolder = Path.Combine(gameFolder, "Game");  
            if (!Directory.Exists(gameFilesFolder))
            {
                Directory.CreateDirectory(gameFilesFolder);
            }

            string coverPhotoFolder = Path.Combine(gameFolder, "Photo");  
            if (!Directory.Exists(coverPhotoFolder))
            {
                Directory.CreateDirectory(coverPhotoFolder);
            }

            string zipFilePath = Path.Combine(gameFilesFolder, file.FileName);
            using (var stream = new FileStream(zipFilePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            
            string coverPhotoPath = Path.Combine(coverPhotoFolder, "cover.jpg");
            using (var coverStream = new FileStream(coverPhotoPath, FileMode.Create))
            {
                await coverPhoto.CopyToAsync(coverStream);
            }

            try
            {
               
                using (ZipArchive archive = ZipFile.OpenRead(zipFilePath))
                {
                    foreach (ZipArchiveEntry entry in archive.Entries)
                    {
                        if (!string.IsNullOrEmpty(entry.Name))
                        {
                            string destinationPath = Path.Combine(gameFilesFolder, entry.Name);
                            entry.ExtractToFile(destinationPath, overwrite: true);
                        }
                    }
                }

               
                System.IO.File.Delete(zipFilePath);

                var existingGame = await _context.Games
                    .FirstOrDefaultAsync(g => g.userId == user.Id && g.title == title);

                if (existingGame != null)
                {
                    
                    existingGame.description = description;
                    existingGame.gameHeight = gameHeight;
                    existingGame.gameWidth = gameWidth;
                    existingGame.filePath = $"/Games/{userEmailPrefix}/{title}/Game".ToLower();
                    existingGame.coverPhotoPath = $"/Games/{userEmailPrefix}/{title}/Photo/cover.jpg".ToLower(); 

                    _context.Games.Update(existingGame);
                }
                else
                {
                    
                    var game = new Game
                    {
                        title = title,
                        description = description,
                        filePath = $"/Games/{userEmailPrefix}/{title}/Game".ToLower(), 
                        coverPhotoPath = $"/Games/{userEmailPrefix}/{title}/Photo/cover.jpg".ToLower(), 
                        gameHeight = gameHeight,
                        gameWidth = gameWidth,
                        userId = user.Id
                    };

                    _context.Games.Add(game);
                }

                await _context.SaveChangesAsync();

                return Ok(new { message = "Game uploaded and extracted successfully!", path = gameFolder });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error extracting file: {ex.Message}");
            }
        }
    }
}
