# Book Review API Endpoints Guide

## 1. Authentication Endpoints

### 1.1 Register a New User
```http
POST /api/signup
Content-Type: application/json

{
    "username": "swaraj",
    "email": "swaraj@example.com",
    "password": "password123"
}
```
**Response (201 Created):**
```json
{
    "_id": "user_id_here",
    "username": "swaraj",
    "email": "swaraj@example.com",
    "token": "jwt_token_here"
}
```

### 1.2 Login User
```http
POST /api/login
Content-Type: application/json

{
    "email": "swaraj@example.com",
    "password": "password123"
}
```
**Response (200 OK):**
```json
{
    "_id": "user_id_here",
    "username": "swaraj",
    "email": "swaraj@example.com",
    "token": "jwt_token_here"
}
```

## 2. Book Management Endpoints

### 2.1 Create a New Book (Authenticated)
```http
POST /api/books
Content-Type: application/json
Authorization: Bearer jwt_token_here

{
    "title": "The 48 Laws of Power",
    "author": "Robert Greene",
    "genre": "Self-Help",
    "description": "The 48 Laws of Power is a self-help book by American author Robert Greene. The book is a bestseller, selling over 1.2 million copies in the United States, and is popular with prison inmates and celebrities."
}
```
**Response (201 Created):**
```json
{
    "_id": "book_id_here",
    "title": "The 48 Laws of Power",
    "author": "Robert Greene",
    "genre": "Self-Help",
    "description": "The 48 Laws of Power is a self-help book...",
    "averageRating": 0,
    "totalReviews": 0,
    "createdAt": "2024-03-21T10:00:00.000Z",
    "updatedAt": "2024-03-21T10:00:00.000Z"
}
```

### 2.2 Get All Books (with Pagination and Filters)
```http
GET /api/books?page=1&limit=10&author=Robert%20Greene&genre=Self-Help
```
**Response (200 OK):**
```json
{
    "books": [
        {
            "_id": "book_id_here",
            "title": "The 48 Laws of Power",
            "author": "Robert Greene",
            "genre": "Self-Help",
            "description": "...",
            "averageRating": 4.5,
            "totalReviews": 10
        }
    ],
    "page": 1,
    "pages": 1,
    "total": 1
}
```

### 2.3 Get Book Details by ID
```http
GET /api/books/book_id_here?page=1&limit=10
```
**Response (200 OK):**
```json
{
    "book": {
        "_id": "book_id_here",
        "title": "The 48 Laws of Power",
        "author": "Robert Greene",
        "genre": "Self-Help",
        "description": "...",
        "averageRating": 4.5,
        "totalReviews": 10
    },
    "reviews": [
        {
            "_id": "review_id_here",
            "rating": 5,
            "comment": "Excellent book!",
            "user": {
                "_id": "user_id_here",
                "username": "swaraj"
            },
            "createdAt": "2024-03-21T10:00:00.000Z"
        }
    ],
    "page": 1,
    "pages": 1,
    "totalReviews": 1
}
```

## 3. Review Management Endpoints

### 3.1 Create a Review (Authenticated)
```http
POST /api/books/book_id_here/reviews
Content-Type: application/json
Authorization: Bearer jwt_token_here

{
    "rating": 5,
    "comment": "An excellent book that provides deep insights into power dynamics and human behavior. Highly recommended!"
}
```
**Response (201 Created):**
```json
{
    "_id": "review_id_here",
    "book": "book_id_here",
    "user": "user_id_here",
    "rating": 5,
    "comment": "An excellent book that provides deep insights...",
    "createdAt": "2024-03-21T10:00:00.000Z"
}
```

### 3.2 Update a Review (Authenticated)
```http
PUT /api/reviews/review_id_here
Content-Type: application/json
Authorization: Bearer jwt_token_here

{
    "rating": 4,
    "comment": "Updated review: A great book with valuable insights, though some laws might be controversial."
}
```
**Response (200 OK):**
```json
{
    "_id": "review_id_here",
    "book": "book_id_here",
    "user": "user_id_here",
    "rating": 4,
    "comment": "Updated review: A great book with valuable insights...",
    "updatedAt": "2024-03-21T11:00:00.000Z"
}
```

### 3.3 Delete a Review (Authenticated)
```http
DELETE /api/reviews/review_id_here
Authorization: Bearer jwt_token_here
```
**Response (200 OK):**
```json
{
    "message": "Review removed"
}
```

## Testing Instructions

1. First, register a new user using the signup endpoint
2. Login with the registered credentials to get a JWT token
3. Use the token in the Authorization header for authenticated endpoints
4. Create a book using the create book endpoint
5. Get the book ID from the response
6. Create a review for the book
7. Get the review ID from the response
8. Test updating and deleting the review

## Error Responses

All endpoints may return the following error responses:

- 400 Bad Request: Invalid input data
- 401 Unauthorized: Missing or invalid token
- 403 Forbidden: Not authorized to perform the action
- 404 Not Found: Resource not found
- 500 Internal Server Error: Server error

Example error response:
```json
{
    "message": "Error message here"
}
``` 