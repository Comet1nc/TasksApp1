#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

# Install Node.js and NPM

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["TasksApp.csproj", "."]
RUN dotnet restore "./TasksApp.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "TasksApp.csproj" -c Release -o /app/build
FROM build AS publish
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash
RUN  apt-get install -y nodejs
COPY ./ClientApp/package*.json ./
RUN npm install
RUN npm install -g @angular/cli
RUN dotnet publish "TasksApp.csproj" -c Release -o /app/publish
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TasksApp.dll"]

