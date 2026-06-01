# TuRifa Backend

> API para aplicación de rifas/loterías. Migrada de Supabase a **PostgreSQL + Prisma ORM**.

## Stack

| Tecnología | Uso |
|------------|-----|
| Node.js + Express | Server |
| Prisma ORM 7 | Acceso a BD |
| PostgreSQL | Base de datos |
| Firebase Auth | Autenticación |
| Stripe | Pagos |
| Jest | Tests |

## Primeros pasos

### 1. Instalar dependencias

```bash
pnpm install
```

> Esto ejecuta `postinstall: prisma generate` automáticamente.

### 2. Configurar variables de entorno

```bash
cp .env.example .env
# Editar .env con tu DATABASE_URL real
```

Variables requeridas:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
PORT=3000
```

Variables opcionales (para features activas):

```env
# FIREBASE_PROJECT_ID=...
# FIREBASE_PRIVATE_KEY=...
# FIREBASE_CLIENT_EMAIL=...
# STRIPE_SECRET_KEY=...
# STRIPE_WEBHOOK_SECRET=...
```

### 3. Migrar la base de datos

```bash
# Desarrollo: crea tablas desde schema.prisma
pnpm prisma migrate dev --name init

# Producción: aplica migraciones existentes
pnpm prisma migrate deploy
```

### 4. Arrancar

```bash
pnpm dev    # desarrollo (con nodemon)
pnpm start  # producción
```

## Comandos útiles

```bash
pnpm prisma generate        # Regenerar el cliente Prisma
pnpm prisma validate        # Validar el schema
pnpm prisma studio          # Abrir GUI de la BD (http://localhost:5555)
pnpm test                   # Correr tests (watch mode)
pnpm test:ci                # Tests para CI
```

## Estructura del proyecto

```
backend/
├── prisma/
│   ├── schema.prisma      # Definición de modelos y relaciones
│   ├── migrations/        # Migraciones de BD
│   └── config.ts          # Config de Prisma
├── src/
│   ├── db.js              # Cliente Prisma (singleton)
│   ├── config.js          # Variables de entorno
│   ├── app.js             # Express app
│   ├── index.js           # Entry point
│   ├── models/            # Acceso a datos (Prisma)
│   ├── controllers/       # Lógica de negocio
│   ├── routes/           # Rutas Express
│   ├── middlewares/      # Validación, auth, etc.
│   ├── firebase.js       # Admin SDK
│   └── test/             # Tests Jest
└── docs/
    └── MIGRATION_*.md     # Plan de migración Supabase→Prisma
```

## Modelos de datos

> ⚠️ **Estado de la migración**: ✅ **COMPLETADA** — Supabase reemplazado por PostgreSQL + Prisma ORM.

### User
| Campo | Tipo | Descripción |
|-------|------|-------------|
| uid | String (PK) | Firebase UID |
| name | String? | Nombre |
| email | String (unique) | Email |
| createdAt | DateTime | Creación |
| updatedAt | DateTime | Última modificación |

### Rifa
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Int (PK) | ID autoincrement |
| title | String | Título |
| description | String? | Descripción |
| totalTickets | Int | Total de tickets |
| prize | String? | Premio |
| startDate | DateTime | Fecha inicio |
| endDate | DateTime? | Fecha fin |
| userID | String (FK) | Creador (Firebase UID) |
| ticketPrice | Float | Precio por ticket |
| organizer | String? | Nombre organizador |
| totalTicketsSold | Int | Tickets vendidos |
| revenue | Float | Ingresos |
| state | String? | Estado (Activa, Cerrada, etc.) |
| winnerUserId | String? | UID ganador |
| winnerTicketId | Int? | Ticket ganador |
| drawDate | DateTime? | Fecha sorteo |

### Ticket
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Int (PK) | ID autoincrement |
| idRifa | Int (FK) | Rifa |
| idUser | String (FK) | Comprador (Firebase UID) |
| buyDate | DateTime | Fecha compra |
| expireDate | DateTime? | Fecha expiración |
| state | String | Estado (Activo, Expirado, etc.) |
| idPago | String? | ID de pago Stripe |
| price | Float | Precio pagado |
| methodPago | String? | Método de pago |
| numeroBoleto | String? | Número de boleto (generado) |

## API Endpoints

### Auth
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/register` | Registrar usuario |
| POST | `/auth/login` | Login |
| POST | `/auth/user` | Obtener usuario por UID |
| GET | `/auth/supabase` | Health check BD |

### Rifas
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/rifas/crear` | Crear rifa |
| POST | `/rifas/mis-rifas` | Rifas del usuario |
| GET | `/rifas/todas` | Todas las rifas |
| GET | `/rifas/:id` | Rifa por ID |
| PUT | `/rifas/actualizar/:id` | Actualizar rifa |
| POST | `/rifas/decrementar` | Decrementar tickets |
| GET | `/rifas/check/:id` | Verificar si está lista para sorteo |
| POST | `/rifas/sorteo/:id` | Realizar sorteo |

### Tickets
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/tickets/crear` | Crear ticket |

## Migración de Supabase a Prisma

Documentación detallada en [`docs/MIGRATION_SUPABASE_A_PRISMA.md`](docs/MIGRATION_SUPABASE_A_PRISMA.md).

### Resumen de cambios

| Archivo | Cambio |
|---------|--------|
| `package.json` | `@supabase/supabase-js` → `prisma`, `@prisma/client`, `@prisma/adapter-pg`, `pg` |
| `src/db.js` | Supabase client → Prisma client con pg adapter |
| `src/models/*.js` | Queries de Supabase → Prisma ORM |
| `prisma/schema.prisma` | Nuevo — define todos los modelos |

## Tests

```bash
pnpm test           # Watch mode
pnpm test:ci        # CI mode
```

Tests actuales:
- `auth.controllers.test.js` — Auth endpoints
- `db.connection.test.js` — Conexión a BD
- `striper.controllers.test.js` — Stripe integration
- `app.test.js` — Smoke tests