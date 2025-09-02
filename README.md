# Lectio

Rede social voltada para leitores, desenvolvida como projeto acadêmico para a disciplina C14.

---

## Prerequisites

- [Node.js]
- [NPM]
- [Docker]

---

## Installation

Clone the repository:

```bash
git clone https://github.com/VitorAu/caramelo.git
cd caramelo
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root of the project:

```env
DATABASE_URL="database_url"
```

---

## Docker Setup

Create a `docker-compose.yml` file in the root of the project:

```yaml
services:
  postgres:
    image: postgres:17
    container_name: container_name
    environment:
      POSTGRES_PASSWORD: "password"
      POSTGRES_USER: "user"
      POSTGRES_DB: "db"
    ports:
      - "5432:5432"
```

---

## Database Setup

1. Start the PostgreSQL container:

```bash
npm run db:start
```

2. Run database migrations:

```bash
npx knex migrate:latest
```

---

## Development

```bash
npm run start
```

---

## Stopping the Database

To stop the PostgreSQL container:

```bash
npm run db:stop
```

---

