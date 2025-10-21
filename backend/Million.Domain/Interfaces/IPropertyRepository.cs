using Million.Domain.Entities;

namespace Million.Domain.Interfaces;

public interface IPropertyRepository
{
    Task<List<Property>> GetAllAsync(PropertyFilter filter, int page, int pageSize);
    Task<Property?> GetByIdAsync(string id);
    Task<long> CountAsync(PropertyFilter filter);
}

public class PropertyFilter
{
    public string? Name { get; set; }
    public string? Address { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
}

