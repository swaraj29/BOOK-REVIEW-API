# Book Review API

A RESTful API for managing book reviews built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Book management (create, read)
- Review management (create, update, delete)
- Search functionality
- Pagination
- Filtering by author and genre

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd book-review-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/book-review-api
JWT_SECRET=your_jwt_secret_key_here
```

4. Start the server:
```bash
npm start
```

## API Endpoints

### Authentication
- POST /api/signup - Register a new user
- POST /api/login - Login user

### Books
- POST /api/books - Create a new book (Protected)
- GET /api/books - Get all books (with pagination and filters)
- GET /api/books/:id - Get book details with reviews
- GET /api/search - Search books by title or author

### Reviews
- POST /api/books/:id/reviews - Create a review (Protected)
- PUT /api/reviews/:id - Update a review (Protected)
- DELETE /api/reviews/:id - Delete a review (Protected)

## Request Examples

### Signup
```bash
curl -X POST http://localhost:5000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "john_doe", "email": "john@example.com", "password": "password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'
```

### Create Book
```bash
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "genre": "Fiction", "description": "A story of the fabulously wealthy Jay Gatsby"}'
```

### Create Review
```bash
curl -X POST http://localhost:5000/api/books/BOOK_ID/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"rating": 5, "comment": "Great book!"}'
```

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## Security

- Passwords are hashed using bcrypt
- JWT authentication for protected routes
- Input validation and sanitization
- CORS enabled 