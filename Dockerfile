FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_URLS=http://+:80
# Disabled HTTPS for Docker container to avoid certificate issues
ENV ASPNETCORE_HTTP_PORTS=80

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["project-payflow-backend.csproj", "./"]
RUN dotnet restore "project-payflow-backend.csproj"
COPY . .
RUN dotnet build "project-payflow-backend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "project-payflow-backend.csproj" -c Release -o /app/publish


FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "project-payflow-backend.dll"]
