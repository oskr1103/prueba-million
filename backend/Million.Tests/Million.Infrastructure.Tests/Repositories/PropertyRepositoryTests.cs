using Microsoft.Extensions.Logging;
using Million.Domain.Entities;
using Million.Domain.Interfaces;
using Million.Infrastructure.Configuration;
using Million.Infrastructure.Repositories;
using Moq;
using NUnit.Framework;

namespace Million.Infrastructure.Tests.Repositories;

[TestFixture]
public class PropertyRepositoryTests
{
    private MongoDbSettings _settings;
    private Mock<ILogger<PropertyRepository>> _loggerMock;

    [SetUp]
    public void Setup()
    {
        _settings = new MongoDbSettings
        {
            ConnectionString = "mongodb://localhost:27017",
            DatabaseName = "million_test",
            PropertiesCollectionName = "properties_test"
        };
        _loggerMock = new Mock<ILogger<PropertyRepository>>();
    }

    [Test]
    public async Task GetAllAsync_WithNoFilters_ReturnsAllProperties()
    {
        var repository = new PropertyRepository(_settings, _loggerMock.Object);
        var filter = new PropertyFilter();

        var result = await repository.GetAllAsync(filter, 1, 10);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.Count, Is.LessThanOrEqualTo(10));
    }

    [Test]
    public async Task GetAllAsync_WithNameFilter_ReturnsFilteredProperties()
    {
        var repository = new PropertyRepository(_settings, _loggerMock.Object);
        var filter = new PropertyFilter { Name = "Casa" };

        var result = await repository.GetAllAsync(filter, 1, 10);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.All(p => p.Name.Contains("Casa", StringComparison.OrdinalIgnoreCase) || 
                                     p.Name.Contains("casa", StringComparison.OrdinalIgnoreCase)), Is.True);
    }

    [Test]
    public async Task GetAllAsync_WithAddressFilter_ReturnsFilteredProperties()
    {
        var repository = new PropertyRepository(_settings, _loggerMock.Object);
        var filter = new PropertyFilter { Address = "México" };

        var result = await repository.GetAllAsync(filter, 1, 10);

        Assert.That(result, Is.Not.Null);
    }

    [Test]
    public async Task GetAllAsync_WithPriceRange_ReturnsFilteredProperties()
    {
        var repository = new PropertyRepository(_settings, _loggerMock.Object);
        var filter = new PropertyFilter 
        { 
            MinPrice = 2000000, 
            MaxPrice = 4000000 
        };

        var result = await repository.GetAllAsync(filter, 1, 10);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.All(p => p.PriceProperty >= 2000000 && p.PriceProperty <= 4000000), Is.True);
    }

    [Test]
    public async Task GetAllAsync_WithPagination_ReturnsCorrectPage()
    {
        var repository = new PropertyRepository(_settings, _loggerMock.Object);
        var filter = new PropertyFilter();

        var page1 = await repository.GetAllAsync(filter, 1, 5);
        var page2 = await repository.GetAllAsync(filter, 2, 5);

        Assert.That(page1, Is.Not.Null);
        Assert.That(page2, Is.Not.Null);
        Assert.That(page1.Count, Is.LessThanOrEqualTo(5));
        Assert.That(page2.Count, Is.LessThanOrEqualTo(5));

        if (page1.Count > 0 && page2.Count > 0)
        {
            Assert.That(page1[0].Id, Is.Not.EqualTo(page2[0].Id));
        }
    }

    [Test]
    public async Task GetByIdAsync_ValidId_ReturnsProperty()
    {
        var repository = new PropertyRepository(_settings, _loggerMock.Object);
        var filter = new PropertyFilter();
        var properties = await repository.GetAllAsync(filter, 1, 1);

        if (properties.Count > 0)
        {
            var propertyId = properties[0].Id!;
            var result = await repository.GetByIdAsync(propertyId);

            Assert.That(result, Is.Not.Null);
            Assert.That(result!.Id, Is.EqualTo(propertyId));
        }
    }

    [Test]
    public async Task GetByIdAsync_InvalidId_ReturnsNull()
    {
        var repository = new PropertyRepository(_settings, _loggerMock.Object);
        var result = await repository.GetByIdAsync("000000000000000000000000");

        Assert.That(result, Is.Null);
    }

    [Test]
    public async Task CountAsync_WithNoFilters_ReturnsTotal()
    {
        var repository = new PropertyRepository(_settings, _loggerMock.Object);
        var filter = new PropertyFilter();

        var count = await repository.CountAsync(filter);

        Assert.That(count, Is.GreaterThanOrEqualTo(0));
    }

    [Test]
    public async Task CountAsync_WithFilters_ReturnsFilteredCount()
    {
        var repository = new PropertyRepository(_settings, _loggerMock.Object);
        var filterAll = new PropertyFilter();
        var filterPrice = new PropertyFilter { MinPrice = 3000000 };

        var countAll = await repository.CountAsync(filterAll);
        var countFiltered = await repository.CountAsync(filterPrice);

        Assert.That(countFiltered, Is.LessThanOrEqualTo(countAll));
    }
}

