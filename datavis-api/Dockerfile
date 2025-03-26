FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app


# Environment variable (Release, Development, etc) set in compose
ARG ASPNETCORE_ENVIRONMENT

USER app
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY datavis-api/datavis-api.csproj datavis-api/
RUN dotnet restore "datavis-api/datavis-api.csproj"
COPY . .
WORKDIR "/src/datavis-api"
RUN dotnet build "datavis-api.csproj" -c $ASPNETCORE_ENVIRONMENT -o /app/build

FROM build AS publish
RUN dotnet publish "datavis-api.csproj" -c $ASPNETCORE_ENVIRONMENT -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "datavis-api.dll"]
