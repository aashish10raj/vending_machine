using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Admin_Web_APIs.Model
{
    public class ProductModel
    {
        [BsonId]
        [BsonElement("-id")]
        [BsonRepresentation(BsonType.ObjectId)]
        public  ObjectId _id { get; set; } //for Db _id

        [BsonElement("product_id")]
        public Int32? Product_ID { get; set; }

        [BsonElement("product_name")]
        public string? Product_name { get; set; }

        [BsonElement("price")]
        public Int32? price { get; set; }

        [BsonElement("quantity")]
        public Int32? quantity { get; set; }

        [BsonElement("image-url")]
        public string? image_url { get; set; }


    }
}
