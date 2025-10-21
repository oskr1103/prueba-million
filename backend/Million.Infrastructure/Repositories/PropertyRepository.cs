using Microsoft.Extensions.Logging;
using Million.Domain.Entities;
using Million.Domain.Interfaces;
using Million.Infrastructure.Configuration;
using MongoDB.Driver;

namespace Million.Infrastructure.Repositories;

public class PropertyRepository : IPropertyRepository
{
    private readonly IMongoCollection<Property> _properties;
    private readonly ILogger<PropertyRepository> _logger;

    public PropertyRepository(MongoDbSettings settings, ILogger<PropertyRepository> logger)
    {
        _logger = logger;

        try
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _properties = database.GetCollection<Property>(settings.PropertiesCollectionName);

            CreateIndexes();
            _logger.LogInformation("PropertyRepository initialized successfully");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to initialize PropertyRepository");
            throw;
        }
    }

    private void CreateIndexes()
    {
        var indexKeysDefinition = Builders<Property>.IndexKeys
            .Ascending(p => p.Name)
            .Ascending(p => p.AddressProperty)
            .Ascending(p => p.PriceProperty);

        var indexModel = new CreateIndexModel<Property>(indexKeysDefinition);

        _properties.Indexes.CreateOne(indexModel);
    }

    public async Task<List<Property>> GetAllAsync(PropertyFilter filter, int page, int pageSize)
    {
        try
        {
            var filterDefinition = BuildFilter(filter);

            var result = await _properties
                .Find(filterDefinition)
                .Skip((page - 1) * pageSize)
                .Limit(pageSize)
                .ToListAsync();

            _logger.LogDebug("Retrieved {Count} properties from database", result.Count);
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving properties from database");
            throw;
        }
    }

    public async Task<Property?> GetByIdAsync(string id)
    {
        try
        {
            var result = await _properties.Find(p => p.Id == id).FirstOrDefaultAsync();
            if (result == null)
            {
                _logger.LogDebug("Property with ID {PropertyId} not found in database", id);
            }
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving property {PropertyId} from database", id);
            throw;
        }
    }

    public async Task<long> CountAsync(PropertyFilter filter)
    {
        var filterDefinition = BuildFilter(filter);
        return await _properties.CountDocumentsAsync(filterDefinition);
    }

    private FilterDefinition<Property> BuildFilter(PropertyFilter filter)
    {
        var builder = Builders<Property>.Filter;
        var filters = new List<FilterDefinition<Property>>();

        if (!string.IsNullOrWhiteSpace(filter.Name))
        {
            filters.Add(builder.Regex(p => p.Name, new MongoDB.Bson.BsonRegularExpression(filter.Name, "i")));
        }

        if (!string.IsNullOrWhiteSpace(filter.Address))
        {
            filters.Add(builder.Regex(p => p.AddressProperty, new MongoDB.Bson.BsonRegularExpression(filter.Address, "i")));
        }

        if (filter.MinPrice.HasValue)
        {
            filters.Add(builder.Gte(p => p.PriceProperty, filter.MinPrice.Value));
        }

        if (filter.MaxPrice.HasValue)
        {
            filters.Add(builder.Lte(p => p.PriceProperty, filter.MaxPrice.Value));
        }

        return filters.Count > 0 ? builder.And(filters) : builder.Empty;
    }
}

