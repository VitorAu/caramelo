# lectio

Rede social voltada para leitores, desenvolvida como projeto acadêmico para a disciplina C14.

---

## Prerequisites

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/VitorAu/lectio.git
cd lectio
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root of the project with the following content:

```env
# Server configuration
SERVER_PORT=3000
JWT_SECRET="jwt_secret"

# Database configuration
DB_HOST="localhost"
DB_PORT=5432
DB_USER="db_user"
DB_PASSWORD="db_password"
DB_NAME="dn_name"
```

---

## Docker Setup (PostgreSQL)

Create a `docker-compose.yml` file in the root of the project:

```yaml
services:
  postgres:
    image: postgres:17
    container_name: lectio_postgres
    environment:
      POSTGRES_PASSWORD: "db_password"
      POSTGRES_USER: "db_user"
      POSTGRES_DB: "db_name"
    ports:
      - "5432:5432"
```

Start the PostgreSQL container:

```bash
npm run db:start
# or
docker-compose up -d
```

Stop the PostgreSQL container:

```bash
npm run db:stop
# or
docker-compose down
```

---

## Database Setup with Knex

1. **Configure the database connection:**\
   `knexfile.ts` now reads from `.env`. Make sure the values in `.env` match your PostgreSQL container.

2. **Run migrations to create tables:**

```bash
npx knex migrate:latest
```

3. **Optional:** Create a new migration:

```bash
npx knex migrate:make migration_name
```

4. **Optional:** Rollback the last migration:

```bash
npx knex migrate:rollback
```

> Migrations are located in `./src/database/migrations`.

---

## Development

Start the server:

```bash
npm run start
```

