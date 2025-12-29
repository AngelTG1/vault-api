# Users feature

- Table: `users` (see `migrations/create_users_table.sql`)
- Only admins (authenticated with admin token) can create users via POST /users/create

Payload:
{
  "userName": "someuser",
  "password": "secret"
}

Notes:
- Passwords are stored hashed with `bcrypt` and `hash_method` = 'bcrypt'.
- Routes require DB connection. The router uses `dbRequiredMiddleware` and `adminOnlyMiddleware` for create.
