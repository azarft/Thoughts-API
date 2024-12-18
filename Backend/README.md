# How to Test the Server

The following endpoints are available for testing the server:

## Base URL

`http://46.101.231.121:8080`

## Authentication Endpoints

### Register a User
**POST /api/v1/auth/register**
- **Note**: Use a valid email address during registration, as email verification is required to complete the process.
```bash
curl -X POST http://46.101.231.121:8080/api/v1/auth/register \
-H "Content-Type: application/json" \
-d '{"username": "testuser", "password": "123456", "email": "user@example.com"}'
```

### Login
**POST /api/v1/auth/login**
```bash
curl -X POST http://46.101.231.121:8080/api/v1/auth/login \
-H "Content-Type: application/json" \
-d '{"username": "testuser", "password": "123456"}'
```

### Refresh Token
**POST /api/v1/auth/refreshToken**
```bash
curl -X POST http://46.101.231.121:8080/api/v1/auth/refreshToken \
-H "Content-Type: application/json" \
-d '{"token": "refresh-token"}'
```

## Entry Management Endpoints

### Get All Entries
**GET /api/v1/entries**
```bash
curl -X GET http://46.101.231.121:8080/api/v1/entries
```

### Create a New Entry
**POST /api/v1/entries**
```bash
curl -X POST http://46.101.231.121:8080/api/v1/entries \
-H "Content-Type: application/json" \
-d '{"content": "New Entry Content"}'
```

### Update an Entry
**PUT /api/v1/entries/{id}**
```bash
curl -X PUT http://46.101.231.121:8080/api/v1/entries/1 \
-H "Content-Type: application/json" \
-d '{"content": "Updated Entry Content"}'
```

### Delete an Entry
**DELETE /api/v1/entries/{id}**
```bash
curl -X DELETE http://46.101.231.121:8080/api/v1/entries/1
```

## Favorites Management Endpoints

### Get Favorite Entries
**GET /api/v1/favourites**
```bash
curl -X GET http://46.101.231.121:8080/api/v1/favourites
```

### Add an Entry to Favorites
**POST /api/v1/favourites/{id}**
```bash
curl -X POST http://46.101.231.121:8080/api/v1/favourites/1
```

### Remove an Entry from Favorites
**DELETE /api/v1/favourites/{id}**
```bash
curl -X DELETE http://46.101.231.121:8080/api/v1/favourites/1
```