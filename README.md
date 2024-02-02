The Dating Site Backend
Description:
This is the back-end for a dating site for dog-lovers who want to date
or simply meet up. They can find each other through their
dogs.

# RESTful API Node Express Mongoose Example

The project builds RESTful APIs using Node.js, Express, Mongoose,
Bcryptjs, Cookie-Parser, CORS, Dotenv, Jsonwebtoken and Morgan

## Manual Installation

Clone the repo:

```bash
git clone  https://github.com/JesusCidoncha/the-dating-site-backend.git
cd the-dating-site-backend
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env
# open .env and modify the environment variables
```

## Table of Contents

- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)

## Commands

Running in development:

```bash
npm start
# or
npm run dev
```

Running in production:

```bash
# build
npm run build
# start
npm run prod
```

## Environment Variables

The environment variables can be found and modified in the `.env` file.

```bash
# App name
APP_NAME = # default Dating-Site-Backend
# Host
HOST = # default 0.0.0.0
# Port
PORT = # default 666
# URL of the Mongo DB
DATABASE_URI = mongodb://127.0.0.1:27017/database_name
# URL frontend
FRONTEND_URL = # default http://localhost:5173
```

## Project Structure

```
 |--config\         # Environment variables and configuration
 |--controllers\    # Controllers
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models
 |--routes\         # Routes
 |--services\       # Business logic
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--index.js        # App entry point
```

### API Endpoints

List of available routes:
**Auth routes**:\
`POST api/auth/signup` - Signup\
`POST api/auth/signin` - Signin\
`POST api/auth/verify` - Verify\
`User routes**:\
`POST api/users`- Create a user\`GET api/users`- Get all users\`GET api/users/:userId`- Get user\`PUT api/users/:userId`- Update user\`DELETE api/users/:userId`- Delete user
**Dog routes**:\`POST api/roles`- Create a role\`GET api/roles`- Get all roles\`GET api/roles/:userId`- Get role\`PUT api/roles/:userId`- Update role\`DELETE api/roles/:userId`- Delete role
**Image routes**:\`POST api/v1/images/upload` - Upload image

## License

[MIT](LICENSE)
Routes:
GET /
renders the homepage
GET /auth/signup
redirects to / if user logged in
renders the signup form (with flash msg)
POST /auth/signup
redirects to / if user logged in
body:
username
email
password
GET /auth/login
redirects to / if user logged in
renders the login form (with flash msg)
POST /auth/login
redirects to / if user logged in
body:
username
password
GET /events
renders the event list + the create form
POST /events/create
redirects to / if user is anonymous
body:
name
date
location
description
Models:
User model
username: String
password: String
Event model
owner: ObjectId<User>
name: String
description: String
date: Date
firstName:
lastName:
email:
