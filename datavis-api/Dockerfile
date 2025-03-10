FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
# EXPOSE 5065

ENV ASPNETCORE_URLS=http://+:5065

USER app
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src
COPY datavis-api/datavis-api.csproj datavis-api/
RUN dotnet restore "datavis-api/datavis-api.csproj"
COPY . .
WORKDIR "/src/datavis-api"
RUN dotnet build "datavis-api.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "datavis-api.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "datavis-api.dll"]
