using Million.Application.DTOs;

namespace Million.Application.Interfaces;

public interface IPropertyService
{
    Task<PropertyListResponse> GetPropertiesAsync(PropertyFilterRequest filterRequest, int page, int pageSize);
    Task<PropertyDto?> GetPropertyByIdAsync(string id);
}

