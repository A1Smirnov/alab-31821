# JWT Authentication with Express

This project is a simple Express application that demonstrates user registration, login, and protected routes using JSON Web Tokens (JWT) for authentication and authorization. The application uses bcrypt for password hashing and now includes user profiles.

## Features

- User registration with additional profile information (name and birthdate)
- User login with JWT generation
- Protected routes requiring authentication
- Basic form handling with EJS templates
- User profile page displaying registered information

## Technologies Used

- Node.js
- Express.js
- JWT (jsonwebtoken)
- Bcrypt
- EJS
- Body-parser

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/get-npm) (Node package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the application using `nodemon` (or `node`):

   ```bash
   npm start
   ```

4. The server will start on [http://localhost:3000](http://localhost:3000).

## API Endpoints

### 1. Register a new user

- **URL:** `/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "testuser",
    "password": "password123",
    "name": "John Doe",
    "birthdate": "1990-01-01"
  }
  ```
- **Response:** 
  - 200 OK: User registered successfully.
  - 400 Bad Request: User already exists or missing fields.

### 2. Login

- **URL:** `/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```
- **Response:** 
  - 200 OK: Returns a JSON Web Token.
  - 400 Bad Request: Invalid username or password.

### 3. Protected Route

- **URL:** `/protected`
- **Method:** `GET`
- **Headers:** 
  ```
  Authorization: Bearer <token>
  ```
- **Response:** 
  - 200 OK: Returns a welcome message with the username.
  - 403 Forbidden: No token provided.
  - 401 Unauthorized: Invalid token.

### 4. User Profile

- **URL:** `/profile`
- **Method:** `GET`
- **Headers:** 
  ```
  Authorization: Bearer <token>
  ```
- **Response:** 
  - 200 OK: Returns the user's profile information (username, name, birthdate).
  - 403 Forbidden: No token provided.
  - 401 Unauthorized: Invalid token.

## Views

- **Home Page:** Renders the home page.
- **User Page:** Renders a user-specific page based on the provided username.
- **Profile Page:** Displays the user's profile information after login.

## Testing with Postman

You can test the API using Postman. Create the following requests:

1. **Register** a new user with a POST request to `http://localhost:3000/register` with the required JSON body including name and birthdate.
2. **Login** the user with a POST request to `http://localhost:3000/login` and store the returned token.
3. Use the token to access the protected route by sending a GET request to `http://localhost:3000/protected` with the token in the Authorization header.
4. Access the user profile by sending a GET request to `http://localhost:3000/profile` with the token in the Authorization header.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Changes Made:
- Updated to reflect user profiles, including additional fields in the registration API.
- Included a new API endpoint for retrieving user profiles.
- Clarified the installation and testing instructions.

Let me know if you need further adjustments or additions!