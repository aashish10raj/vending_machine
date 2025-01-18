﻿using Microsoft.Extensions.Configuration;
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

       //Here implement all the collection 
       //Format-> Get(collectionName)collection

        //For Product Collection
        public IMongoCollection<ProductModel> GetProductCollection()
        {
            return _database.GetCollection<ProductModel>("Product");
        }

        //For User Collection
        public IMongoCollection<UserModel> GetUserCollection()
        {
            return _database.GetCollection<UserModel>("User");
        }

        
    }
}
