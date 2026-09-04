# LoanPilot auth app

Minimal Node.js backend (built-in `http`/`crypto`/`fs` only, no dependencies)
that adds real server-side authentication to the existing static
login/onboarding UI.

## Start the server

    node server.js

Server runs at: **http://localhost:3000**

## Seeded account

    Email:    csonker04@gmail.com
    Password: charu123

Only a salted scrypt hash of the password is stored, in `data/users.json`.
To add or change a user:

    node seed.js <email> <password>

## Routes

- `GET /` → redirects to `/onboarding` if logged in, else `/login`
- `GET /login` → login page; redirects to `/onboarding` if already logged in
- `GET /onboarding` → protected; redirects to `/login` if not logged in
- `POST /login` → `{ email, password }` JSON body → sets an HttpOnly session cookie
- `POST /logout` → destroys the session and clears the cookie
- `GET /api/session` → `{ authenticated, email }` for client-side checks
