# Vidly

Vidly is a video streaming application built with Node.js and Express. It allows users to upload, stream, and manage videos.

## Features

- User authentication
- Video upload and streaming
- Genre management
- Rental management
- User management
- Environment configuration
- Error handling
- Security features (e.g., JWT authentication, password hashing)
- Logging with Morgan
- CORS support
- Pug templating engine for views
- Configuration management with `config` package
- Database integration with Mongoose
- RESTful API design

## Endpoints

- `/api/genres`: Manage video genres
- `/api/movies`: Manage videos
- `/api/rentals`: Manage rentals
- `/api/users`: Manage users
- `/api/auth`: User authentication
- `/`: Home page

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   cd vidly
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```
     vidly_jwtPrivateKey=<your_jwt_private_key>
     ```
4. Start the application:
   ```bash
   npm start
   ```
5. For development, you can use:
   ```bash
   npm run dev
   ```
6. Open your browser and navigate to `http://localhost:3000` to access the application.
7. For production, ensure you have the necessary environment variables set and run the application with:
   ```bash
   npm start
   ```
## Development

- The application is built using Node.js and Express.
- The code is organized into routes, models, and middleware.
- The application uses Mongoose for MongoDB interactions.
- The application uses Pug as the templating engine for rendering views.
- The application uses Morgan for logging HTTP requests.
- The application uses Helmet for security enhancements.
- The application uses CORS to allow cross-origin requests from specified origins.
- The application uses the `config` package for configuration management.
- The application uses bcrypt for password hashing.
- The application uses JWT for user authentication.
- The application uses debug for debugging purposes.

## Configuration
- The application uses the `config` package for configuration management.
- Configuration files are located in the `config` directory.
- You can create different configuration files for different environments (e.g., `default.json`, `production.json`, etc.).
- The `vidly_jwtPrivateKey` environment variable is required for JWT authentication.

> Made with ❤️ by [fasakinhenry](https://github.com/fasakinhenry)
