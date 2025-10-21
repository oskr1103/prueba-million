using Microsoft.Extensions.Logging;
using Million.Application.DTOs;
using Million.Application.Services;
using Million.Domain.Entities;
using Million.Domain.Interfaces;
using Moq;
using NUnit.Framework;

namespace Million.Application.Tests.Services;

[TestFixture]
public class PropertyServiceTests
{
    private Mock<IPropertyRepository> _repositoryMock;
    private Mock<ILogger<PropertyService>> _loggerMock;
    private PropertyService _propertyService;

    [SetUp]
    public void Setup()
    {
        _repositoryMock = new Mock<IPropertyRepository>();
        _loggerMock = new Mock<ILogger<PropertyService>>();
        _propertyService = new PropertyService(_repositoryMock.Object, _loggerMock.Object);
    }

    [Test]
    public async Task GetPropertiesAsync_ReturnsPropertiesWithCorrectPagination()
    {
        var properties = new List<Property>
        {
            new Property
            {
                Id = "1",
                IdOwner = "owner1",
                Name = "Property 1",
                AddressProperty = "Address 1",
                PriceProperty = 100000,
                Image = "image1.jpg"
            },
            new Property
            {
                Id = "2",
                IdOwner = "owner2",
                Name = "Property 2",
                AddressProperty = "Address 2",
                PriceProperty = 200000,
                Image = "image2.jpg"
            }
        };

        _repositoryMock
            .Setup(r => r.GetAllAsync(It.IsAny<PropertyFilter>(), 1, 10))
            .ReturnsAsync(properties);

        _repositoryMock
            .Setup(r => r.CountAsync(It.IsAny<PropertyFilter>()))
            .ReturnsAsync(25);

        var filterRequest = new PropertyFilterRequest();
        var result = await _propertyService.GetPropertiesAsync(filterRequest, 1, 10);

        Assert.That(result.Properties, Has.Count.EqualTo(2));
        Assert.That(result.TotalCount, Is.EqualTo(25));
        Assert.That(result.TotalPages, Is.EqualTo(3));
        Assert.That(result.Page, Is.EqualTo(1));
    }

    [Test]
    public async Task GetPropertyByIdAsync_PropertyExists_ReturnsProperty()
    {
        var property = new Property
        {
            Id = "1",
            IdOwner = "owner1",
            Name = "Property 1",
            AddressProperty = "Address 1",
            PriceProperty = 100000,
            Image = "image1.jpg"
        };

        _repositoryMock
            .Setup(r => r.GetByIdAsync("1"))
            .ReturnsAsync(property);

        var result = await _propertyService.GetPropertyByIdAsync("1");

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Id, Is.EqualTo("1"));
        Assert.That(result.Name, Is.EqualTo("Property 1"));
    }

    [Test]
    public async Task GetPropertyByIdAsync_PropertyDoesNotExist_ReturnsNull()
    {
        _repositoryMock
            .Setup(r => r.GetByIdAsync("999"))
            .ReturnsAsync((Property?)null);

        var result = await _propertyService.GetPropertyByIdAsync("999");

        Assert.That(result, Is.Null);
    }
}

