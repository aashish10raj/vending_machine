using Admin_Web_APIs.Data;
using Admin_Web_APIs.Model;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Admin_Web_APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly MongoDbService _mongoDbService;

        //private readonly IMongoCollection<ProductModel> product;

        public AdminController(MongoDbService mongoDbService)
        {
            _mongoDbService = mongoDbService;//Injected the service here
        }


        [HttpPost]
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

        [HttpPut("{id}")]

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
    }
}
