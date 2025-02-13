# !/bin/bash
dotnet ef dbcontext scaffold \
"Host=localhost;Database=crop_yields_owid;Username=postgres;Password=postgres" \
Npgsql.EntityFrameworkCore.PostgreSQL \
--output-dir Models/Generated \
--namespace DatavisApi.Models \
--context-dir DbContexts/Generated \
--context-namespace DatavisApi.Data \
--context CropDataContext \
--no-onconfiguring \
--data-annotations \
--force