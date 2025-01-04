using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using Admin_Web_APIs.Model;

namespace Admin_Web_APIs.Data
{
    public class MongoDbService
    {
        private readonly IMongoDatabase _database;

        // Constructor: Injects the IConfiguration to get the MongoDB settings
        public MongoDbService(IConfiguration configuration)
        {
            // Get connection string and database name from appsettings.json
            var connectionString = configuration.GetValue<string>("MongoDB:ConnectionStrings");
            var databaseName = configuration.GetValue<string>("MongoDB:DatabaseName");

            // Create MongoClient
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(databaseName); // Get the MongoDB database
        }

        // Public property to access the database
        public IMongoDatabase Database => _database;

        // Example: Method to get the Product collection
        public IMongoCollection<ProductModel> GetProductCollection()
        {
            return _database.GetCollection<ProductModel>("Product");
        }
    }
}
