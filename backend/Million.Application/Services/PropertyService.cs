using Microsoft.Extensions.Logging;
using Million.Application.DTOs;
using Million.Application.Interfaces;
using Million.Domain.Interfaces;

namespace Million.Application.Services;

public class PropertyService : IPropertyService
{
    private readonly IPropertyRepository _repository;
    private readonly ILogger<PropertyService> _logger;

    public PropertyService(IPropertyRepository repository, ILogger<PropertyService> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public async Task<PropertyListResponse> GetPropertiesAsync(
        PropertyFilterRequest filterRequest,
        int page,
        int pageSize)
    {
        _logger.LogInformation("Getting properties with filters: Name={Name}, Address={Address}, MinPrice={MinPrice}, MaxPrice={MaxPrice}, Page={Page}, PageSize={PageSize}",
            filterRequest.Name, filterRequest.Address, filterRequest.MinPrice, filterRequest.MaxPrice, page, pageSize);

        var filter = new PropertyFilter
        {
            Name = filterRequest.Name,
            Address = filterRequest.Address,
            MinPrice = filterRequest.MinPrice,
            MaxPrice = filterRequest.MaxPrice
        };

        var properties = await _repository.GetAllAsync(filter, page, pageSize);
        var totalCount = await _repository.CountAsync(filter);

        _logger.LogInformation("Retrieved {Count} properties out of {TotalCount} total", properties.Count, totalCount);

        var propertyDtos = properties.Select(p => new PropertyDto
        {
            Id = p.Id!,
            IdOwner = p.IdOwner,
            Name = p.Name,
            AddressProperty = p.AddressProperty,
            PriceProperty = p.PriceProperty,
            Image = p.Image
        }).ToList();

        return new PropertyListResponse
        {
            Properties = propertyDtos,
            TotalCount = (int)totalCount,
            Page = page,
            PageSize = pageSize,
            TotalPages = (int)Math.Ceiling((double)totalCount / pageSize)
        };
    }

    public async Task<PropertyDto?> GetPropertyByIdAsync(string id)
    {
        _logger.LogInformation("Getting property by ID: {PropertyId}", id);

        var property = await _repository.GetByIdAsync(id);

        if (property == null)
        {
            _logger.LogWarning("Property with ID {PropertyId} not found", id);
            return null;
        }

        _logger.LogInformation("Property {PropertyId} retrieved successfully", id);

        return new PropertyDto
        {
            Id = property.Id!,
            IdOwner = property.IdOwner,
            Name = property.Name,
            AddressProperty = property.AddressProperty,
            PriceProperty = property.PriceProperty,
            Image = property.Image
        };
    }
}

