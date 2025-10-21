using Microsoft.AspNetCore.Mvc;
using Million.Api.Controllers;
using Million.Application.DTOs;
using Million.Application.Interfaces;
using Moq;
using NUnit.Framework;

namespace Million.Api.Tests.Controllers;

[TestFixture]
public class PropertiesControllerTests
{
    private Mock<IPropertyService> _serviceMock;
    private PropertiesController _controller;

    [SetUp]
    public void Setup()
    {
        _serviceMock = new Mock<IPropertyService>();
        _controller = new PropertiesController(_serviceMock.Object);
    }

    [Test]
    public async Task GetProperties_ValidParameters_ReturnsOkResult()
    {
        var mockResponse = new PropertyListResponse
        {
            Properties = new List<PropertyDto>(),
            TotalCount = 0,
            Page = 1,
            PageSize = 10,
            TotalPages = 0
        };

        _serviceMock
            .Setup(s => s.GetPropertiesAsync(It.IsAny<PropertyFilterRequest>(), 1, 10))
            .ReturnsAsync(mockResponse);

        var result = await _controller.GetProperties(null, null, null, null, 1, 10);

        Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public async Task GetProperties_InvalidPageNumber_ReturnsBadRequest()
    {
        var result = await _controller.GetProperties(null, null, null, null, 0, 10);

        Assert.That(result.Result, Is.InstanceOf<BadRequestObjectResult>());
    }

    [Test]
    public async Task GetProperties_InvalidPageSize_ReturnsBadRequest()
    {
        var result = await _controller.GetProperties(null, null, null, null, 1, 0);

        Assert.That(result.Result, Is.InstanceOf<BadRequestObjectResult>());
    }

    [Test]
    public async Task GetProperties_PageSizeExceedsMax_ReturnsBadRequest()
    {
        var result = await _controller.GetProperties(null, null, null, null, 1, 101);

        Assert.That(result.Result, Is.InstanceOf<BadRequestObjectResult>());
    }

    [Test]
    public async Task GetProperties_WithFilters_PassesFiltersToService()
    {
        var mockResponse = new PropertyListResponse
        {
            Properties = new List<PropertyDto>(),
            TotalCount = 0,
            Page = 1,
            PageSize = 10,
            TotalPages = 0
        };

        PropertyFilterRequest? capturedFilter = null;
        _serviceMock
            .Setup(s => s.GetPropertiesAsync(It.IsAny<PropertyFilterRequest>(), 1, 10))
            .Callback<PropertyFilterRequest, int, int>((filter, page, pageSize) => capturedFilter = filter)
            .ReturnsAsync(mockResponse);

        await _controller.GetProperties("Casa", "México", 1000000, 5000000, 1, 10);

        Assert.That(capturedFilter, Is.Not.Null);
        Assert.That(capturedFilter!.Name, Is.EqualTo("Casa"));
        Assert.That(capturedFilter.Address, Is.EqualTo("México"));
        Assert.That(capturedFilter.MinPrice, Is.EqualTo(1000000));
        Assert.That(capturedFilter.MaxPrice, Is.EqualTo(5000000));
    }

    [Test]
    public async Task GetPropertyById_ValidId_ReturnsOkResult()
    {
        var mockProperty = new PropertyDto
        {
            Id = "123",
            IdOwner = "owner123",
            Name = "Test Property",
            AddressProperty = "Test Address",
            PriceProperty = 1000000,
            Image = "test.jpg"
        };

        _serviceMock
            .Setup(s => s.GetPropertyByIdAsync("123"))
            .ReturnsAsync(mockProperty);

        var result = await _controller.GetPropertyById("123");

        Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
        var okResult = result.Result as OkObjectResult;
        Assert.That(okResult!.Value, Is.EqualTo(mockProperty));
    }

    [Test]
    public async Task GetPropertyById_InvalidId_ReturnsNotFound()
    {
        _serviceMock
            .Setup(s => s.GetPropertyByIdAsync("999"))
            .ReturnsAsync((PropertyDto?)null);

        var result = await _controller.GetPropertyById("999");

        Assert.That(result.Result, Is.InstanceOf<NotFoundObjectResult>());
    }

    [Test]
    public void HealthCheck_ReturnsOkWithStatus()
    {
        var result = _controller.HealthCheck();

        Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
        var okResult = result.Result as OkObjectResult;
        Assert.That(okResult, Is.Not.Null);
        
        var value = okResult!.Value;
        Assert.That(value, Is.Not.Null);
    }
}

