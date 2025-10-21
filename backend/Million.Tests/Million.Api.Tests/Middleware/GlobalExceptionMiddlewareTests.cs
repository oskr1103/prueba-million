using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Million.Api.Middleware;
using Moq;
using NUnit.Framework;
using System.Text;

namespace Million.Api.Tests.Middleware;

[TestFixture]
public class GlobalExceptionMiddlewareTests
{
    private Mock<ILogger<GlobalExceptionMiddleware>> _loggerMock;
    private GlobalExceptionMiddleware _middleware;
    private RequestDelegate _next;
    private HttpContext _httpContext;

    [SetUp]
    public void Setup()
    {
        _loggerMock = new Mock<ILogger<GlobalExceptionMiddleware>>();
        _middleware = new GlobalExceptionMiddleware(_next, _loggerMock.Object);
        _httpContext = new DefaultHttpContext();
        _httpContext.Response.Body = new MemoryStream();
    }

    [Test]
    public async Task InvokeAsync_NoException_ShouldCallNext()
    {
        var called = false;
        _next = async (context) =>
        {
            called = true;
            await Task.CompletedTask;
        };

        _middleware = new GlobalExceptionMiddleware(_next, _loggerMock.Object);

        await _middleware.InvokeAsync(_httpContext);

        Assert.That(called, Is.True);
        Assert.That(_httpContext.Response.StatusCode, Is.EqualTo(200));
    }

    [Test]
    public async Task InvokeAsync_WithException_ShouldReturnInternalServerError()
    {
        _next = async (context) =>
        {
            throw new Exception("Test exception");
        };

        _middleware = new GlobalExceptionMiddleware(_next, _loggerMock.Object);

        await _middleware.InvokeAsync(_httpContext);

        Assert.That(_httpContext.Response.StatusCode, Is.EqualTo(500));
        Assert.That(_httpContext.Response.ContentType, Is.EqualTo("application/json"));
    }

    [Test]
    public async Task InvokeAsync_WithArgumentException_ShouldReturnBadRequest()
    {
        _next = async (context) =>
        {
            throw new ArgumentException("Invalid argument");
        };

        _middleware = new GlobalExceptionMiddleware(_next, _loggerMock.Object);

        await _middleware.InvokeAsync(_httpContext);

        Assert.That(_httpContext.Response.StatusCode, Is.EqualTo(400));
        Assert.That(_httpContext.Response.ContentType, Is.EqualTo("application/json"));
    }
}
