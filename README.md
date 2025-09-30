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

### Back End
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
```
Then open http://localhost:4200/ 

If run `npm run db:seed` in backend success can login with

#### ADMIN

**email:** admin@example.com

**password:** admin123

#### USER
**email:** user@example.com

**password:** user123

## API Documentation

### Authentication
#### Sign up
```POST
POST api/auth/signup
```

**Request Body:**
```json
{
  "username": "exmaple",
  "email": "example@gmail.com",
  "password": "12345678",
  "role_id": 1
}
```

#### Login
```POST
POST api/auth/login
```

**Request Body:**
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

**Request Body:**
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
  DEL /api/users/:id
```

### Roles
