namespace Million.Application.DTOs;

public class PropertyDto
{
    public required string Id { get; set; }
    public required string IdOwner { get; set; }
    public required string Name { get; set; }
    public required string AddressProperty { get; set; }
    public required decimal PriceProperty { get; set; }
    public required string Image { get; set; }
}

public class PropertyListResponse
{
    public required List<PropertyDto> Properties { get; set; }
    public required int TotalCount { get; set; }
    public required int Page { get; set; }
    public required int PageSize { get; set; }
    public required int TotalPages { get; set; }
}

public class PropertyFilterRequest
{
    public string? Name { get; set; }
    public string? Address { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
}

