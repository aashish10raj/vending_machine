using Admin_Web_APIs.Data;
using Admin_Web_APIs.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Admin_Web_APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly MongoDbService _mongoDbService;

        private readonly IMongoCollection<ProductModel> product;

        public ProductController(MongoDbService mongoDbService)
        {
            _mongoDbService = mongoDbService;//Injected the service here
        }

        [HttpGet]//To Get ALL PRODUCTS
        public IActionResult GetAllProduct() {

            var collection = _mongoDbService.GetProductCollection();

            var products = collection.Find(_ => true).ToList();

            return Ok(products);
        }

        [HttpGet("{id}")]//to get the product based on id

        public IActionResult GetProduct(Int32 id)
        {
            var collection = _mongoDbService.GetProductCollection();

            var product = collection.Find(p => p.Product_ID == id).FirstOrDefault();

            if (product == null) { return NotFound(); }
            return Ok(product);
        }



    }
}
