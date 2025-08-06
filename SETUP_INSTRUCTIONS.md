# Project PayFlow Setup Instructions

This document provides comprehensive instructions for setting up and running the Project PayFlow application using XAMPP for the database, and handling Entity Framework Core migrations.

## Prerequisites

- [XAMPP](https://www.apachefriends.org/download.html) (latest version)
- [.NET 9.0 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Visual Studio](https://visualstudio.microsoft.com/) or [Visual Studio Code](https://code.visualstudio.com/) (optional)

## Step 1: Set Up XAMPP and MySQL

1. **Install XAMPP**:
   - Download and install XAMPP from the [official website](https://www.apachefriends.org/download.html).
   - Make sure to include MySQL in your installation.

2. **Start XAMPP Services**:
   - Open the XAMPP Control Panel.
   - Start both Apache and MySQL services by clicking the "Start" buttons next to them.

3. **Access phpMyAdmin**:
   - Open your web browser and go to `http://localhost/phpmyadmin/`.
   - Login with username `root` and no password (default XAMPP configuration).

4. **Create a New Database**:
   - Click on "Databases" in the top menu.
   - Enter `payflow` in the "Create database" field.
   - Click "Create" to create the database.

## Step 2: Configure the Project

1. **Verify Connection String**:
   - Open the `appsettings.json` file in the project root.
   - Ensure your connection string is correctly configured:
     ```json
     "ConnectionStrings": {
       "DefaultConnection": "Host=localhost;Port=3306;Database=payflow;User=root;Password=;"
     }
     ```
   - If XAMPP MySQL is using a different port or if you set a password, update accordingly.

2. **Install Required .NET Tools** (if not already installed):
   - Open a command prompt or terminal.
   - Install the Entity Framework Core tools with:
     ```bash
     dotnet tool install --global dotnet-ef
     ```
   - If already installed, you can update with:
     ```bash
     dotnet tool update --global dotnet-ef
     ```

## Step 3: Apply Database Migrations

1. **Navigate to Project Directory**:
   - Open a command prompt or terminal.
   - Change to your project directory:
     ```bash
     cd D:\work-dev\project-payflow
     ```

2. **Apply Existing Migrations**:
   - Run the following command to apply all existing migrations to your database:
     ```bash
     dotnet ef database update
     ```
   - This will create all the necessary tables in your `payflow` database.

3. **Verify Migration Success**:
   - Check phpMyAdmin to confirm that the tables have been created in your `payflow` database.
   - You should see tables for `Employees`, `Payrolls`, `PayrollReceipts`, and others, as well as a `__EFMigrationsHistory` table.

## Step 4: Run the Application

1. **Build and Run the Project**:
   - In the project directory, run:
     ```bash
     dotnet build
     dotnet run
     ```
   - The application will start and tell you which URLs it's listening on (typically `http://localhost:5000` and `https://localhost:5001`).

2. **Access the API**:
   - Open your browser and navigate to `https://localhost:5001/swagger` or the URL shown in your terminal.
   - You should see the Swagger UI with all available API endpoints.

## Step 5: Making and Applying Schema Changes

If you need to update your database schema, follow these steps:

1. **Make Model Changes**:
   - Modify your model classes in the `Model` folder as needed.
   - For example, add new properties to existing entities or create new entity classes.

2. **Create a New Migration**:
   - After making changes to your models, run:
     ```bash
     dotnet ef migrations add [MigrationName]
     ```
   - Replace `[MigrationName]` with a descriptive name for your changes (e.g., `AddEmployeeAddress`).
   - This will create new migration files in the `Migrations` folder.

3. **Apply the New Migration**:
   - Run the following command to update your database:
     ```bash
     dotnet ef database update
     ```
   - This applies any pending migrations to your database.

4. **Revert a Migration** (if needed):
   - To roll back to a specific migration:
     ```bash
     dotnet ef database update [MigrationName]
     ```
   - Replace `[MigrationName]` with the name of the migration you want to revert to.
   - To completely revert all migrations:
     ```bash
     dotnet ef database update 0
     ```

## Step 6: Developing the Frontend

If you're using the included React frontend in the `project-payflow-frontend` directory:

1. **Navigate to Frontend Directory**:
   ```bash
   cd D:\work-dev\project-payflow\project-payflow-frontend\apps\web
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install
   ```

3. **Start Development Server**:
   ```bash
   pnpm dev
   ```
   This will start the frontend on `http://localhost:5173` which is already configured in CORS settings in the backend.

## Using Docker Compose (Alternative Setup)

You can also run the Project PayFlow application using Docker Compose, which simplifies the setup process by containerizing both the application and its dependencies.

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/) (latest version)
- [Docker Compose](https://docs.docker.com/compose/install/) (included with Docker Desktop)

### Step 1: Build and Run with Docker Compose

1. **Open a Terminal/Command Prompt**:
   - Navigate to the project directory:
     ```bash
     cd path/to/project-payflow
     ```

2. **Start the Application Stack**:
   - Run the following command to build and start all services:
     ```bash
     docker-compose up -d
     ```
   - The `-d` flag runs containers in detached mode (background).
   - This will:
     - Build the .NET application from source
     - Start a MySQL database container
     - Start a phpMyAdmin container for database management
     - Set up networking between containers
     - Apply environment configurations

3. **Access the Services**:
   - Access the API and Swagger UI: http://localhost:8080/swagger
   - Access phpMyAdmin: http://localhost:8081 (login with username: root, password: payflowpassword)

### Step 2: Managing the Application

1. **View Application Logs**:
   - To see the logs from the application:
     ```bash
     docker-compose logs app
     ```
   - To follow the logs in real-time:
     ```bash
     docker-compose logs -f app
     ```

2. **Stop the Application**:
   - To stop all containers:
     ```bash
     docker-compose down
     ```
   - To stop and remove all containers, networks, and volumes:
     ```bash
     docker-compose down -v
     ```

3. **Rebuild After Code Changes**:
   - After making changes to your code:
     ```bash
     docker-compose build app
     docker-compose up -d
     ```

### Step 3: Database Migrations in Docker

1. **Run Migrations Inside the Container**:
   - To apply migrations inside the Docker container:
     ```bash
     docker-compose exec app dotnet ef database update
     ```

2. **Create a New Migration**:
   - After changing your model classes:
     ```bash
     docker-compose exec app dotnet ef migrations add [MigrationName]
     ```

3. **Remove a Migration**:
   - If you need to revert a migration:
     ```bash
     docker-compose exec app dotnet ef migrations remove
     ```

### Troubleshooting Docker Setup

1. **Connection Issues**:
   - If the app can't connect to the database, make sure the database container is running:
     ```bash
     docker-compose ps db
     ```

2. **Container Errors**:
   - Check container logs for specific errors:
     ```bash
     docker-compose logs db
     ```

3. **Recreate Containers**:
   - If you encounter persistent issues, try rebuilding from scratch:
     ```bash
     docker-compose down -v
     docker-compose up -d --build
     ```

## Troubleshooting

### Database Connection Issues

1. **Check XAMPP Services**:
   - Ensure both Apache and MySQL services are running in the XAMPP Control Panel.

2. **Verify Port Settings**:
   - Check if MySQL is running on the default port 3306. If not, update your connection string.
   - Run this SQL in phpMyAdmin to check the port: `SHOW VARIABLES WHERE Variable_name = 'port';`

3. **Connection Refused**:
   - If you get a connection refused error, ensure MySQL is running and that there are no firewall issues.

### Migration Errors

1. **Cannot access the database**:
   - Check if your MySQL service is running.
   - Verify that the database `payflow` exists.
   - Confirm that the connection string in `appsettings.json` is correct.

2. **Migration pending error when running the application**:
   - Run `dotnet ef database update` to apply all pending migrations.

3. **Conflicting migrations**:
   - If you have conflicts between local changes and existing migrations, you may need to remove the last migration:
     ```bash
     dotnet ef migrations remove
     ```

## Additional Resources

- [Entity Framework Core Documentation](https://docs.microsoft.com/en-us/ef/core/)
- [XAMPP Documentation](https://www.apachefriends.org/docs/)
- [.NET CLI Documentation](https://docs.microsoft.com/en-us/dotnet/core/tools/)

## Backup and Restore

It's good practice to regularly backup your database:

1. **Export Database**:
   - In phpMyAdmin, select your `payflow` database.
   - Click the "Export" tab at the top.
   - Choose "Quick" export method and SQL format.
   - Click "Go" to download the SQL dump file.

2. **Import Database**:
   - In phpMyAdmin, create or select your database.
   - Click the "Import" tab at the top.
   - Choose your SQL dump file and click "Go".
