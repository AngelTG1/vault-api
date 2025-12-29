# Auth feature - usage

1. Copy `.env.example` to `.env` and fill database and JWT values.

2. Create database (if not exists) and run migration:

```bash
# create database (if needed)
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS pgina_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
# run migration
npm run migrate
```

3. Start server:

```bash
npm run dev
```

4. Endpoints:

- POST /auth/login
  - body: { "username": "admin", "password": "secret" }
  - returns: { token, user }

- POST /auth/register (protected: requires `Authorization: Bearer <token>` from an admin)
  - body: { "username": "newuser", "email": "", "password": "secret", "isAdmin": true }

Notes:
- To create the very first admin you can insert a row directly into the `auth` table. Use Node or a CLI to generate a bcrypt hash (example: `node -e "console.log(require('bcrypt').hashSync('secret',10))"`) and insert using SQL.

### Create admin script
You can also use the included script to create the first admin easily:

- Via environment variables in `.env`:

```bash
# add to .env
FIRST_ADMIN_USERNAME=admin
FIRST_ADMIN_EMAIL=admin@example.com
FIRST_ADMIN_PASSWORD=secret

# then run
npm run create-admin
```

- Or via CLI args:

```bash
npm run create-admin -- admin admin@example.com secret
```

The script will check for an existing username and abort if it already exists. Keep your `.env` private as usual.

- Keep your real `.env` out of version control; only commit `.env.example`.
