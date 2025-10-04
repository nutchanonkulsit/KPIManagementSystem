# KPI Management System

## Tech Stack

- **Front End:** Angular  
- **Back End:** Node.js (Express)  
- **Database:** PostgreSQL  
- **Authentication:** JWT  
- **API Documentation:** Postman

## Setup instructions
### Database
- PostgreSQL runs on port 5432  
- Database: `kpi_management`  
- User: `root`  
- Password: `password`  

### Run the project
Need to have PostgreSQL start on port 5432 and run this command
```
npm run db:setup
npm run dev
```

#### For docker
```
npm run docker:compose
npm run docker:db
```

<!-- ### Back End
```
cd backend/
npm install
npm run db:migrate
npm run seed
npm run start
```

#### For Docker


**`backend/src/config/config.json`**:

Replace with

```json
{
  "development": {
    "username": "root",
    "password": "password",
    "database": "kpi_management",
    "host": "db",
    "port": 5432,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": "password",
    "database": "kpi_management",
    "host": "db",
    "port": 5432,
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": "password",
    "database": "kpi_management",
    "host": "db",
    "port": 5432,
    "dialect": "postgres"
  }
}
```

**`backend/src/config/db.js`**:

Replace DATABASE_URL with

```
  const DATABASE_URL = "postgres://root:password@db:5432/kpi_management";
```

then

```
docker-compose up --build
docker exec -it node-app sh
npm run db:migrate
npm run db:seed
```

### Front End
```
cd frontend/
npm install
ng serve
```
#### For Docker

```
docker build -t kpi-frontend .
docker run -d -p 4200:80 kpi-frontend
``` -->
Open http://localhost:4200/ 



### Default Account

If run npm run db:seed in backend success can login with

| Role  | Email                                         | Password |
| ----- | --------------------------------------------- | -------- |
| Admin | [admin@example.com](mailto:admin@example.com) | admin123 |
| User  | [user@example.com](mailto:user@example.com)   | user123  |

## API Documentation

### Authentication

#### Sign up
```
POST api/auth/signup
```

Request Body:
```json
{
  "username": "exmaple",
  "email": "example@gmail.com",
  "password": "12345678",
  "role_id": 1
}
```

#### Login
```
POST api/auth/login
```

Request Body:
```json
{
  "email": "example@gmail.com",
  "password": "12345678"
}
```

### Users

#### Get all users
```
  GET /api/users
```

#### Get user by ID
```
  GET /api/users/:id
```

#### Update user
```
  PUT /api/users/:id
```

Request Body:
```json
{
  "username": "example",
  "email": "example@gmail.com",
  "password": "12345678",
  "role_id": 1
}
```

#### Delete user
```
  DELETE /api/users/:id
```

### Roles

#### Get all roles
```
  GET /api/roles
```

#### Get role by ID
```
  GET /api/roles/:id
```

#### Create role
```
  POST /api/roles
```
Request Body:
```json
{
  "name": "user" // Can create only user and admin
}
```

#### DELETE role
```
  DELETE api/roles/:id
```

### KPIs

#### Get all KPIs
Params: user_id, status(On Track, At Risk, Off Track), order (ASC/DESC)
```
  GET api/kpis
```

#### Get KPI by ID
```
  GET api/kpis/:id
```

#### Get KPI by UserID
Params: user_id
```
  GET api/kpis/user
```

#### Get KPI Length
```
  GET api/kpis/count
```

#### Get KPI Progress
Params: user_id, status(On Track, At Risk, Off Track), month, year
```
  GET api/kpis/progress
```

#### Get KPI Progress with UserID
```
  GET api/kpis/progress/:id
```

#### Get KPI Length By status
Params: status(On Track, At Risk, Off Track)
```
  GET api/kpis/count/status
```

#### Create KPI 
```
  POST api/kpis
```
Request Body:
```json
{
    "title": "Increase Monthly Sales",
    "description": "Track sales revenue to reach company targets.",
    "target_value": 100000.00,
    "actual_value": 25000.00,
    "status": "On Track",
    "assigned_user": 1,
    "start_date": "2025-10-01",
    "end_date": "2025-12-31"
}
```
#### Update KPI
```
  PUT api/kpis/:id
```
Request Body:
```json
{
    "title": "Increase Monthly",
    "description": "Track sales revenue to reach company targets.",
    "target_value": 150000.00,
    "actual_value": 50000.00,
    "status": "On Track",
    "assigned_user": 1,
    "start_date": "2025-10-01",
    "end_date": "2025-12-31"
}
```
#### Delete KPI
```
  DELETE api/kpis/:id
```

### KPI_Updates

#### Get KPI_Update
Params: kpi_id
```
  GET api/kpi_updates/kpi
```

#### Create KPI_Update
```
  POST api/kpi_updates
```
Request Body:
```json
{
    "kpi_id": 1,
    "updated_value" : 500.00,
    "comment":"Update",
    "updated_by": 1
}
```

#### Delete KPI_Update
```
  DELETE api/kpi_updates/:id
```
