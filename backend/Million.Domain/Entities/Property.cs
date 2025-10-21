using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Million.Domain.Entities;

public class Property
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("idOwner")]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string IdOwner { get; set; }

    [BsonElement("name")]
    public required string Name { get; set; }

    [BsonElement("addressProperty")]
    public required string AddressProperty { get; set; }

    [BsonElement("priceProperty")]
    public required decimal PriceProperty { get; set; }

    [BsonElement("image")]
    public required string Image { get; set; }
}

