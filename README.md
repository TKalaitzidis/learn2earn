# Learn2Earn - Book Trading Platform

Learn2Earn is a full-stack web application designed to facilitate book trading between users. Built using modern technologies like React.js, Express.js, Node.js, and PostgreSQL, it provides a seamless experience for both users and administrators.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User System**:
  - Sign Up and Sign In functionality.
  - Secure authentication with encrypted passwords.
  - JWT-based session management.
  
- **Admin Dashboard**:
  - View and manage users.
  - Oversee book listings.
  - Perform administrative tasks like approving book trades and managing platform content.

- **Book Trading**:
  - List books for trade.
  - Browse available books and request trades.
  
- **Responsive Design**:
  - Fully responsive interface for seamless use across devices.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **Encryption**: bcrypt for password hashing

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites
- Node.js installed on your machine
- PostgreSQL database

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/learn2earn.git
   cd learn2earn
   ```

2. **Install dependencies** for both frontend and backend:
   ```bash
   # Install backend dependencies
   cd server
   npm install
   
   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables** (see below).

### Environment Variables
Create a `.env` file in the `server` directory with the following environment variables:

```plaintext
# Server
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=learn2earn_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# Client
REACT_APP_API_URL=http://localhost:5000
```

### Database Setup

1. **Create the PostgreSQL database**:
   ```bash
   psql -U postgres
   CREATE DATABASE learn2earn_db;
   ```

2. **Run migrations** (if applicable).

### Running the Application

1. **Backend**:
   ```bash
   cd server
   npm start
   ```

2. **Frontend**:
   ```bash
   cd client
   npm start
   ```

The application will be running at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`


## Contributing

We welcome contributions! If you would like to contribute, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Let me know if you'd like to customize any sections further!
