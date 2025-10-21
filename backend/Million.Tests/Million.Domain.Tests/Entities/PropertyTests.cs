using Million.Domain.Entities;
using NUnit.Framework;

namespace Million.Domain.Tests.Entities;

[TestFixture]
public class PropertyTests
{
    [Test]
    public void Property_DefaultConstructor_ShouldInitializeProperties()
    {
        var property = new Property
        {
            Id = "123",
            IdOwner = "owner123",
            Name = "Test Property",
            AddressProperty = "Test Address",
            PriceProperty = 1000000,
            Image = "test.jpg"
        };

        Assert.That(property.Id, Is.EqualTo("123"));
        Assert.That(property.IdOwner, Is.EqualTo("owner123"));
        Assert.That(property.Name, Is.EqualTo("Test Property"));
        Assert.That(property.AddressProperty, Is.EqualTo("Test Address"));
        Assert.That(property.PriceProperty, Is.EqualTo(1000000));
        Assert.That(property.Image, Is.EqualTo("test.jpg"));
    }

    [Test]
    public void Property_WithValidData_ShouldBeValid()
    {
        var property = new Property
        {
            Id = "507f1f77bcf86cd799439011",
            IdOwner = "507f1f77bcf86cd799439012",
            Name = "Luxury Villa",
            AddressProperty = "Bogotá, Colombia",
            PriceProperty = 5000000,
            Image = "https://example.com/image.jpg"
        };

        Assert.That(property.Id, Is.Not.Null);
        Assert.That(property.IdOwner, Is.Not.Null);
        Assert.That(property.Name, Is.Not.Null.And.Not.Empty);
        Assert.That(property.AddressProperty, Is.Not.Null.And.Not.Empty);
        Assert.That(property.PriceProperty, Is.GreaterThan(0));
        Assert.That(property.Image, Is.Not.Null.And.Not.Empty);
    }

    [Test]
    public void Property_PriceProperty_ShouldAcceptDecimalValues()
    {
        var property = new Property
        {
            Id = "123",
            IdOwner = "owner123",
            Name = "Test Property",
            AddressProperty = "Test Address",
            PriceProperty = 1500000.50m,
            Image = "test.jpg"
        };

        Assert.That(property.PriceProperty, Is.EqualTo(1500000.50m));
        Assert.That(property.PriceProperty, Is.TypeOf<decimal>());
    }
}
