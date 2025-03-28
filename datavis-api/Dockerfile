FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app


# Environment variable (Release, Development, etc) set in compose

# USER app

FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy dependencies and install them
COPY datavis-api.csproj .
RUN dotnet restore datavis-api.csproj

# Copy source code and build
COPY . .
RUN dotnet build datavis-api.csproj -o ./build

FROM build AS publish
RUN dotnet publish datavis-api.csproj -o ./publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /src/publish .
ENTRYPOINT ["dotnet", "datavis-api.dll"]
