using Admin_Web_APIs.Data;
using Admin_Web_APIs.Model;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;

namespace Admin_Web_APIs.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]

 
    public class AdminController : ControllerBase
    {
        private readonly MongoDbService _mongoDbService;

        //private readonly IMongoCollection<ProductModel> product;

        public AdminController(MongoDbService mongoDbService)
        {
            _mongoDbService = mongoDbService;//Injected the service here
        }

        //endpoint to add products

        [HttpPost("/addProduct")]
        public IActionResult AddProduct([FromBody] ProductModel product)
        {
            if (product == null)
            {
                return BadRequest("Product data is required.");
            }

       
            var collection = _mongoDbService.GetProductCollection();//fetch the product collection using the mongodbservice

            collection.InsertOne(product);//adding the product

            
            return Ok(collection);//  returning ?? can also call getallproduct here
        }

        //endpoint to delete product 

        [HttpDelete("{id}")]

        public IActionResult DelProduct(Int32 id)
        {
            var collection = _mongoDbService.GetProductCollection(); //got the product collection

            var filter = Builders<ProductModel>.Filter.Eq(p => p.Product_ID, id);// have to implement filter before using the deleteone

            var result = collection.DeleteOne(filter); // Deleted the product by product_id

            
            if (result.DeletedCount == 0)
            {
                return NotFound($"Product with ID {id} not found.");//if id is irrelevant
            }

           
            return Ok($"Product with ID {id} was successfully deleted.");
        }

        //endpoint to change product qty

        [HttpPatch("{id}/quantity")]

        public IActionResult ToChangeProdQTy(Int32 id, [FromBody] int newQty)
        {
            var collection = _mongoDbService.GetProductCollection(); //got the product collection

            var filter = Builders<ProductModel>.Filter.Eq(p => p.Product_ID, id); //filter defn

            var update = Builders<ProductModel>.Update.Set(p => p.quantity, newQty); //update defn

            var result = collection.UpdateOne(filter, update);//update one takes filter defn and update defn
                                                              // Check if the product was found and updated


            if (result.ModifiedCount == 0)
            {
                return NotFound($"Product with ID {id} not found or quantity is already {newQty}.");
            }

            // Return success message
            return Ok($"Product quantity for ID {id} was successfully updated to {newQty}.");


        }

        //endpoint to change product price

        [HttpPatch("{id}/price")]

        public IActionResult ToChangeProdPrice(Int32 id, [FromBody] int newPrice)
        {
            var collection = _mongoDbService.GetProductCollection(); //got the product collection

            var filter = Builders<ProductModel>.Filter.Eq(p => p.Product_ID, id); //filter defn

            var update = Builders<ProductModel>.Update.Set(p => p.price, newPrice); //update defn

            var result = collection.UpdateOne(filter, update);//update one takes filter defn and update defn
                                                              // Check if the product was found and updated


            if (result.ModifiedCount == 0)
            {
                return NotFound($"Product with ID {id} not found or price is already {newPrice}.");
            }

            // Return success message
            return Ok($"Product Price for ID {id} was successfully updated to {newPrice}.");


        }

        //endpoint to add User

        [HttpPost("/addUser")]

        public IActionResult AddUser([FromBody] UserModel newuser)
        {
            var collection = _mongoDbService.GetUserCollection(); //got user collection

            if (newuser == null) { return BadRequest("Invalid email or Password"); }

            var existinguser = collection.Find(u => u.Email == newuser.Email).FirstOrDefault();

            if (existinguser != null) { return Conflict("User already exists"); }

            newuser.Password = BCrypt.Net.BCrypt.HashPassword(newuser.Password); //Hashing the  password before storing in the DB

            collection.InsertOne(newuser);

            return Ok("User Created Successfully");


        }

        //endpoint to get all user

        [HttpGet("/GetAlluser")]
        public IActionResult GetAllUser()
        {

            var collection = _mongoDbService.GetUserCollection();

            

            var user = collection.Find(_ => true).ToList();

            return Ok(user);
        }

        //endpoint to delete the user

        [HttpDelete("/deluser")]

        public IActionResult DelUser(Int32 id)
        {
            var collection = _mongoDbService.GetUserCollection(); //got the product collection

            var filter = Builders<UserModel>.Filter.Eq(u => u.User_Id, id);// have to implement filter before using the deleteone

            var result = collection.DeleteOne(filter); // Deleted the product by product_id


            if (result.DeletedCount == 0)
            {
                return NotFound($"User with ID {id} not found.");//if id is irrelevant
            }


            return Ok($"User with ID {id} was successfully deleted.");
        }
    }
}
