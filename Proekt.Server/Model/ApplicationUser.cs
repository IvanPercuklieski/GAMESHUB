using Microsoft.AspNetCore.Identity;

namespace Proekt.Server.Model
{
    public class ApplicationUser : IdentityUser
    {

        public List<Game> games = new List<Game>();
    }
}
