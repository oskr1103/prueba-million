using Microsoft.AspNetCore.Mvc;
using Million.Application.DTOs;
using Million.Application.Interfaces;

namespace Million.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertiesController : ControllerBase
{
    private readonly IPropertyService _propertyService;

    public PropertiesController(IPropertyService propertyService)
    {
        _propertyService = propertyService;
    }

    /// <summary>
    /// Obtiene una lista paginada de propiedades con filtros opcionales
    /// </summary>
    /// <param name="name">Filtro por nombre de propiedad</param>
    /// <param name="address">Filtro por dirección</param>
    /// <param name="minPrice">Precio mínimo en USD</param>
    /// <param name="maxPrice">Precio máximo en USD</param>
    /// <param name="page">Número de página (default: 1)</param>
    /// <param name="pageSize">Elementos por página (default: 10, max: 100)</param>
    /// <returns>Lista de propiedades con información de paginación</returns>
    [HttpGet]
    [ProducesResponseType(typeof(PropertyListResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<PropertyListResponse>> GetProperties(
        [FromQuery] string? name,
        [FromQuery] string? address,
        [FromQuery] decimal? minPrice,
        [FromQuery] decimal? maxPrice,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        if (page < 1 || pageSize < 1 || pageSize > 100)
        {
            return BadRequest(new { error = "Invalid pagination parameters" });
        }

        var filterRequest = new PropertyFilterRequest
        {
            Name = name,
            Address = address,
            MinPrice = minPrice,
            MaxPrice = maxPrice
        };

        var result = await _propertyService.GetPropertiesAsync(filterRequest, page, pageSize);
        return Ok(result);
    }

    /// <summary>
    /// Obtiene los detalles de una propiedad específica
    /// </summary>
    /// <param name="id">ID único de la propiedad</param>
    /// <returns>Detalles completos de la propiedad</returns>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(PropertyDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<PropertyDto>> GetPropertyById(string id)
    {
        var property = await _propertyService.GetPropertyByIdAsync(id);

        if (property == null)
        {
            return NotFound(new { error = $"Propiedad con ID {id} no encontrada" });
        }

        return Ok(property);
    }

    /// <summary>
    /// Verifica el estado de salud de la API
    /// </summary>
    /// <returns>Estado de salud del servicio</returns>
    [HttpGet("health")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<object> HealthCheck()
    {
        return Ok(new { status = "healthy", timestamp = DateTime.UtcNow });
    }
}

