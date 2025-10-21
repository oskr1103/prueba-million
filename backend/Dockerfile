FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["Million.Api/Million.Api.csproj", "Million.Api/"]
COPY ["Million.Application/Million.Application.csproj", "Million.Application/"]
COPY ["Million.Domain/Million.Domain.csproj", "Million.Domain/"]
COPY ["Million.Infrastructure/Million.Infrastructure.csproj", "Million.Infrastructure/"]
RUN dotnet restore "Million.Api/Million.Api.csproj"

COPY . .
WORKDIR "/src/Million.Api"
RUN dotnet build "Million.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Million.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine AS final
WORKDIR /app
EXPOSE 8080
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Million.Api.dll"]

