using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Admin_Web_APIs.Model
{
    public class UserModel
    {
        [BsonId]
        [BsonElement("-id")]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId _id { get; set; } //for Db _id

        [BsonElement("user_id")]
        [Required]
        public Int32? User_Id { get; set; }

        [EmailAddress]
        [BsonElement("Email")]
        [Required]
        public string? Email { get; set;}

        [BsonElement("Password")]
        [Required]
        public string? Password { get; set; }

        [BsonElement("balance")]
        public float Balance { get; set; }

        [BsonElement("IsAdmin")]
        public bool IsAdmin { get; set; } 
    }
}
