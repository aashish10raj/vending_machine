using Admin_Web_APIs.Data;
using Admin_Web_APIs.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Admin_Web_APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly MongoDbService _mongoDbService;
        private readonly IConfiguration _configuration;
        public LoginController(MongoDbService mongoDbService,IConfiguration configuration)
        {
            _mongoDbService = mongoDbService;
            _configuration = configuration;

        }

        [HttpPost("/login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            var userCollection = _mongoDbService.GetUserCollection ();

            var filters = Builders<UserModel>.Filter.Eq("Email", loginRequest.Email);
            var user= userCollection.Find(filters).FirstOrDefault();

            if (user == null || user.Password!=loginRequest.Password ) { return BadRequest("Invalid Email or Password"); }

            else 
            
            {
                var token = GenerateJwtToken(user);//generating JWT token for good users

                return Ok(new { Token = token });
            }


        }
        //To generate the JWT token
        //1. claims
        //2. signing key 
        //3. Then return the token based on that 
        private string GenerateJwtToken(UserModel user)
        {
            if(user== null)
            {
                throw new ArgumentNullException("name of user is null ");
            }

            //creating claims

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name,user.Email),//adding username to claims
                new Claim(ClaimTypes.Role,user.IsAdmin?"Admin":"NormalUser") //checking and adding the role of the users as we have currently only two roles.

            };

            //JWT signing key

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Abc123abcd1234wer1234^%&fs"));
            var creds= new SigningCredentials(key,SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer:"localhost",
                audience: "https://localhost:3000",
                claims:claims,
                expires:DateTime.Now.AddMinutes(10),//setting the expiry time for token is a must,if not done then it will consider the  token as invalid
                
                signingCredentials: creds);

            //return token
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
