# Users feature

- Table: `users` (see `migrations/create_users_table.sql`)
- Only admins (authenticated with admin token) can create users via POST /users/create

Payload:
{
  "userName": "someuser",
  "password": "secret"
}

Notes:
- Passwords are stored hashed with `SHA1` and `hash_method` = 'SHA1'.
- Routes require DB connection. The router uses `dbRequiredMiddleware` and `adminOnlyMiddleware` for create.
