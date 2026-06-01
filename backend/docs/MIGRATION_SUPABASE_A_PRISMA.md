# Migration Plan: Supabase → PostgreSQL + Prisma

> **Objetivo**: Reemplazar `@supabase/supabase-js` por PostgreSQL directo con Prisma ORM.  
> **Proyecto**: TuRifa backend  
> **Fecha**: 2026-05-31

---

## Reglas generales del proyecto

- **Context7**: Consultar documentación de Prisma antes de implementar queries o configs
- **Engram**: Guardar cada decisión, gotcha y patrón en engram después de cada bloque
- **SDD**: Aplicar workflow SDD para cada bloque que requiera cambios de código

---

## Bloque 0 — Setup inicial

### Status: `completed`

### Tareas
- [x] Instalar `prisma` y `@prisma/client` como dependencies
- [x] Crear `prisma/schema.prisma` con la definición de modelos
- [x] Configurar variables de entorno en `.env` (`DATABASE_URL`)

### Reglas
- **Context7**: Buscar `prisma setup install` antes de instalar ✓
- **Engram**: Guardar decisión de versión de Prisma elegida ✓
- **SDD**: No necesita SDD completo, solo exploración si hay dudas de config

### Qué se hizo
- Prisma 7.x instalado (`prisma` como devDep, `@prisma/client` como dep)
- `prisma/schema.prisma` inicializado con `provider = "prisma-client"` y `output = "../src/generated/prisma"`
- `prisma.config.ts` creado automáticamente por `prisma init`
- `.env` creado con `DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"` (placeholder)
- Usuario debe configurar su `DATABASE_URL` real en `.env`

**Detalles técnicos guardados en engram**:
- Prisma 7+ usa output path para el client generado
- La config del datasource en `prisma.config.ts` (no en schema.prisma directamente)
- `dotenv/config` se importa en `prisma.config.ts` para cargar `.env`

---

## Bloque 1 — Schema de Prisma

### Status: `completed`

### Tareas
- [x] Definir modelo `User` (uid, name, email, createdAt)
- [x] Definir modelo `Rifa` (title, description, total_tickets, prize, etc.)
- [x] Definir modelo `Ticket` (id_rifa, id_user, buy_date, state, etc.)
- [x] Mapear relaciones: User→Rifa (1:N), Rifa→Ticket (1:N), User→Ticket (1:N)

### Reglas
- **Context7**: Buscar `prisma schema models relations` para relaciones correctas ✓
- **Engram**: Guardar el schema mapping (cómo las tablas supabase se traducen a Prisma) ✓
- **SDD**: Crear spec mínimo antes de escribir el schema ✓ (validado con `npx prisma validate`)

### Qué se hizo
- Creado `.env.example` con las variables de entorno necesarias (`DATABASE_URL`, y placeholders para Firebase/Stripe)
- Definido `prisma/schema.prisma` con 3 modelos:

**Modelos creados:**
- `User`: `uid` (PK, Firebase UID), `name`, `email` (unique), `createdAt`, `updatedAt`
- `Rifa`: `id` (autoincrement), `title`, `description`, `totalTickets`, `prize`, `startDate`, `endDate`, `userID` (FK→User.uid), `ticketPrice`, `organizer`, `totalTicketsSold`, `revenue`, `state`, `winnerUserId`, `winnerTicketId`, `drawDate`, `createdAt`, `updatedAt`
- `Ticket`: `id` (autoincrement), `idRifa` (FK→Rifa.id), `idUser` (FK→User.uid), `buyDate`, `expireDate`, `state`, `idPago`, `price`, `methodPago`, `numeroBoleto`, `createdAt`, `updatedAt`

**Relaciones:**
- `User.rifas` → `Rifa[]` (1:N, via `Rifa.userID → User.uid`)
- `Rifa.tickets` → `Ticket[]` (1:N, via `Ticket.idRifa → Rifa.id`)
- `User.tickets` → `Ticket[]` (1:N, via `Ticket.idUser → User.uid`)
- `Rifa.creator` → `User` (muchos Rifas tienen un solo Creador)
- `Ticket.rifa` → `Rifa` (muchos Tickets pertenecen a una Rifa)
- `Ticket.buyer` → `User` (muchos Tickets son de un Usuario)

**Validación:**
- `npx prisma validate` → ✅ Schema válido

**Detalles técnicos guardados en engram:**
- Prisma 7+ el datasource url va en `prisma.config.ts`, no en schema.prisma
- Campos snake_case de Supabase → camelCase en Prisma para convención JS/TS
- `@@index()` en `userID`, `state` de Rifa, `idRifa`, `idUser` de Ticket para queries rápidas

---

## Bloque 2 — Prisma Client

### Status: `completed`

### Tareas
- [x] Reemplazar `src/db.js` con nueva implementación Prisma
- [x] Crear singleton `prisma` para reuse en toda la app
- [x] Remover `import { supabase } from "../db"` en todos los archivos
- [x] Actualizar `package.json` (remover `@supabase/supabase-js`)

### Reglas
- **Context7**: Buscar `prisma client singleton pattern nodejs` ✓
- **Engram**: Guardar el patrón elegido para la conexión Prisma ✓
- **SDD**: No necesita spec, es refactor directo ✓

### Qué se hizo
- Reescrito `src/db.js` usando `@prisma/adapter-pg` + `pg` driver:
  ```js
  import { PrismaPg } from '@prisma/adapter-pg'
  import pkg from '@prisma/client'
  const { PrismaClient } = pkg
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
  export const prisma = new PrismaClient({ adapter })
  ```
- Actualizado `prisma/schema.prisma`: cambiar `provider = "prisma-client"` → `provider = "prisma-client-js"` (necesario para importar desde `@prisma/client`)
- Eliminado folder `src/generated/prisma/` (ya no se usa)
- Removido `@supabase/supabase-js` de dependencies
- Agregado `@prisma/adapter-pg` y `pg` como dependencies
- Agregado `@types/pg` como devDependency
- Agregado script `postinstall: prisma generate` para auto-regeneración del client
- Actualizado `package.json` scripts: `dev` y `start` ahora ejecutan `prisma generate` primero

**Validación:**
- `npm run postinstall` → ✅ Prisma Client generado en `node_modules/@prisma/client`
- Test de import de `prisma` desde `src/db.js` → ✅ `typeof prisma === 'object'`

**Detalles técnicos guardados en engram:**
- ESM con `type: "module"` requiere import default: `import pkg from '@prisma/client'; const { PrismaClient } = pkg`
- Prisma 7 necesita el adapter en el constructor: `new PrismaClient({ adapter })`

---

## Bloque 3 — Refactorizar `user.model.js`

### Status: `pending`

### Tareas
- [x] `createUser(user)` → `prisma.user.create()`
- [x] `getUserByUid(uid)` → `prisma.user.findUnique({ where: { uid } })`
- [x] `getUserByEmail(email)` → `prisma.user.findUnique({ where: { email } })`
- [x] Mantener signatures de retorno `{data, error}` para compatibilidad

### Reglas
- **Context7**: Buscar `prisma user create findunique where` para queries ✓
- **Engram**: Guardar el patrón de error handling (try/catch, cómo retornar error) ✓
- **SDD**: Exploración mínima, luego apply directo ✓

### Qué se hizo
- Reescrito `src/models/user.model.js` con Prisma:
  - `createUser(user)` → `prisma.user.create({ data: { uid, name, email } })`
  - `getUserByUid(uid)` → `prisma.user.findUnique({ where: { uid } })` + throw si no existe
  - `getUserByEmail(email)` → `prisma.user.findUnique({ where: { email } })` + throw si no existe
- Mantenida firma de retorno `{data, error}` para compatibilidad con los controllers existentes
- Import cambiado de `import { supabase } from "../db.js"` → `import { prisma } from "../db.js"`

**Detalles técnicos guardados en engram:**
- `findUnique` de Prisma retorna `null` si no encuentra (no lanza error) — por eso se hace `if (!data) throw` para mantener el comportamiento de Supabase
- El error handling usa `try/catch` y retorna `{data: null, error}` igual que antes

---

## Bloque 4 — Refactorizar `rifa.model.js`

### Status: `completed`

### Tareas
- [x] `createRifa(rifa)` → `prisma.rifa.create()`
- [x] `getRifasUser(userID)` → `prisma.rifa.findMany({ where: { userID } })`
- [x] `getRifa(rifaId)` → `prisma.rifa.findUnique({ where: { id } })`
- [x] `updateRifa(rifaId, fields)` → `prisma.rifa.update({ where: { id }, data })`
- [x] `deleteRifa(rifaId)` → `prisma.rifa.delete({ where: { id } })`
- [x] `decrementRifaTickets(rifaId, amount)` → usar `prisma.$transaction`
- [x] `updateRifaStatus(rifaId, status)` → `prisma.rifa.update()`
- [x] `setRifaWinner(rifaId, userId, ticketId)` → `prisma.rifa.update()`
- [x] `isRifaReadyForDraw(rifaId)` → `prisma.rifa.findUnique()`

### Reglas
- **Context7**: Buscar `prisma transaction $transaction batch` para decrementRifaTickets ✓
- **Engram**: Guardar gotcha de transacciones — Prisma no permite updates crudos en $transaction ✓
- **SDD**: Apply directo con validación post-bloque ✓

### Qué se hizo
- Reescrito `src/models/rifa.model.js` con Prisma:
  - `createRifa` → `prisma.rifa.create()`
  - `getRifasUser` → `prisma.rifa.findMany({ where: { userID } })`
  - `getRifa` → `prisma.rifa.findUnique({ where: { id: parseInt(rifaId) } })`
  - `updateRifa` → `prisma.rifa.update()`
  - `deleteRifa` → `prisma.rifa.delete()`
  - `updateRifaStatus` → `prisma.rifa.update({ data: { state } })`
  - `setRifaWinner` → `prisma.rifa.update()` con winnerUserId, winnerTicketId, drawDate
  - `isRifaReadyForDraw` → `prisma.rifa.findUnique()` + lógica de verificación
- **Key**: `decrementRifaTickets` usa `prisma.$transaction()` con callback `async (tx) => {}` para operación atómica:
  - `tx.rifa.findUnique()` para leer
  - `if (rifa.totalTickets < amount) throw` para validar
  - `tx.rifa.update({ data: { totalTickets: { decrement }, totalTicketsSold: { increment }, revenue: { increment } } })` para actualizar con operaciones atómicas de Prisma

**Detalles técnicos guardados en engram:**
- `parseInt(rifaId)` necesario porque Prisma espera `Int` pero los controllers pasan strings
- `prisma.$transaction(callback)` recibe `tx` como parámetro para usar dentro del callback
- Operaciones atómicas: `{ decrement: amount }`, `{ increment: amount }` funcionan directamente en el `data` del update
- `isRifaReadyForDraw` retorna estructura `{ isReady, rifa, reason }` en `data` para compatibilidad

### Sobre las migraciones de BD
Las migraciones se manejan con `npx prisma migrate`:
- `npx prisma migrate dev` → crea migración desde schema y aplica a la BD (desarrollo)
- `npx prisma migrate deploy` → aplica migraciones pendientes en producción
- `npx prisma db push` → sincroniza el schema directamente (sin archivos de migración, útil para comenzar)
- Las migraciones se guardan en `prisma/migrations/`
- Una vez que tengas tu `DATABASE_URL` configurada, ejecutás `npx prisma migrate dev --name init` para crear la BD

**Flujo recomendado:**
1. Configurar `DATABASE_URL` real en `.env`
2. `npx prisma migrate dev --name init` para crear las tablas desde el schema
3. Para producción: `npx prisma migrate deploy`

---

## Bloque 5 — Refactorizar `ticket.models.js`

### Status: `completed`

### Tareas
- [x] `createTicket(ticket)` → `prisma.ticket.create()`
- [x] `getTicketsByRifaId(rifaId)` → `prisma.ticket.findMany({ where: { idRifa } })`
- [x] `getAllTicketsModel(userId)` → `prisma.ticket.findMany({ where: { idUser } })`
- [x] `getTicketById(ticketId)` → `prisma.ticket.findUnique({ where: { id } })`
- [x] Mantener procesamiento de `numeroBoleto`

### Reglas
- **Context7**: Buscar `prisma findmany where conditions` para queries con filtros ✓
- **Engram**: Ningún descubrimiento nuevo esperado ✓
- **SDD**: Apply directo ✓

### Qué se hizo
- Reescrito `src/models/ticket.models.js` con Prisma:
  - `createTicket` → `prisma.ticket.create()` + genera `numeroBoleto` desde `data.id`
  - `getTicketsByRifaId` → `prisma.ticket.findMany({ where: { idRifa: parseInt(rifaId) } })` + procesamiento de `numeroBoleto` en el map
  - `getAllTicketsModel` → `prisma.ticket.findMany({ where: { idUser } })`
  - `getTicketById` → `prisma.ticket.findUnique({ where: { id: parseInt(ticketId) } })` + throw si null
- Mantenida firma de retorno `{data, error}` para compatibilidad con controllers

**Detalles técnicos guardados en engram:**
- `numeroBoleto` se genera como `#${String(data.id).padStart(4, "0")}` y se adjunta al objeto retornado en `createTicket`
- El procesamiento de `numeroBoleto` en `getTicketsByRifaId` es un map posterior a la query, igual que en la versión Supabase

---

## Bloque 6 — Actualizar Controllers

### Status: `completed`

### Tareas
- [x] `auth.controllers.js`: quitar `supabase` import y queries directas
- [x] `auth.controllers.js`: usar funciones de `user.model.js` actualizadas
- [x] `rifa.controllers.js`: quitar `supabase` import y queries directas
- [x] `rifa.controllers.js`: usar `rifaModel` y `ticketModel` actualizados
- [x] `rifa.controllers.js`: verificar que `getAllRifas` use Prisma

### Reglas
- **Context7**: No necesita — solo re-wiring de imports ✓
- **Engram**: Si hay gotchas de breaking changes en el controller, guardar ahí ✓
- **SDD**: Apply directo ✓

### Qué se hizo
**auth.controllers.js:**
- Removido `import { supabase } from "../db.js"`
- Agregado `import { prisma } from "../db.js"`
- `login`: usa `getUserByUid(uid)` del model en vez de query directa Supabase
- `login`: `userInDb.id` → `userInDb.uid` (PK ahora es Firebase UID, no serial)
- `login`: `createUser` retorna objeto directo (no array), cambio de `newUser?.[0]` → `newUser`
- `login`: código de error unique constraint `23505` → `P2002` (Prisma)
- `register`: `err.status !== 406` → `error.status !== 404`
- `dbactiva`: `supabase.from('users').select('*').limit(1).maybeSingle()` → `prisma.user.findFirst()`
- `getUserByUidController`: usa model `getUserByUid` en vez de controller interno

**rifa.controllers.js:**
- Removido `import { supabase } from "../db.js"`
- Agregado `import { prisma } from "../db.js"`
- `getAllRifas`: `supabase.from('rifas').select('*').order('start_date', ...)` → `prisma.rifa.findMany({ orderBy: { startDate: 'desc' } })`
- `realizarSorteo`: `ganador.id_user` → `ganador.idUser` (camelCase Prisma)
- `realizarSorteo`: `ganador.numero_boleto` → `ganador.numeroBoleto`
- `realizarSorteo`: `user.data.uid` (ya era correcto por el model)
- `checkRifaForDraw`: destructuring correcto de `isRifaReadyForDraw` que retorna `{data: { isReady, rifa, reason }}`

**Detalles técnicos guardados en engram:**
- Prisma `create` retorna objeto directo, no array como `insert` de Supabase
- PK de User es `uid` (Firebase UID), no un `id` serial — por eso `userInDb.uid` en el response de login
- Error codes Prisma: `P2002` = unique constraint violation

---

## Bloque 7 — Migrar Tests

### Status: `completed`

### Tareas
- [x] Actualizar `auth.controllers.test.js`: mockear `prisma` en vez de `supabase`
- [x] Actualizar `db.connection.test.js`: verificar que `prisma` está exportado
- [x] Correr tests con `npm test` y validar que pasan

### Reglas
- **Context7**: No necesita — solo re-wiring de mocks ✓
- **Engram**: Guardar si hay diferencias en cómo se mockean las funciones Prisma ✓
- **SDD**: Apply directo, verificación con test run ✓

### Qué se hizo
- Reescrito `auth.controllers.test.js`:
  - Removido mock de `supabase` (`from`, `select`, `eq`, `maybeSingle`)
  - Agregado mock de `prisma` (`user.findFirst`)
  - Login mock ahora usa `userModel.getUserByUid` en vez de query Supabase directa
  - Verifica `userInDb.uid` (no `userInDb.id`) — PK ahora es Firebase UID
  - Error code de "not found" en test: `406` → `404`
- Reescrito `db.connection.test.js`:
  - Renombrado describe de "Supabase Database Connection" → "Prisma Database Connection"
  - Mock `mockSupabase.from().select().limit()` → `mockPrisma.user.findFirst()`
  - Test de error: `supabase.from('users').select().limit()` → `prisma.user.findFirst()`

**Validación:**
- `npm run test:ci` → ✅ 14 tests passed, 4 test suites

**Detalles técnicos guardados en engram:**
- El mock de Prisma se hace sobre `prisma.user.findFirst` (no necesita chain de métodos como Supabase)
- Tests de auth ahora verifican `userInDb.uid` porque el PK del modelo User es `uid` (Firebase UID)

---

## Bloque 8 — Cleanup y verificación final

### Status: `completed`

### Tareas
- [x] Verificar que no quede ningún `supabase` en el código (grep)
- [x] Correr `npx prisma validate` para validar schema
- [x] Correr todos los tests
- [x] Eliminar `@supabase/supabase-js` del `package.json`
- [x] Correr migración (`npx prisma migrate dev`)
- [x] Actualizar `.env` con configuración real

### Reglas
- **Context7**: No necesita
- **Engram**: Guardar summary de la migración (qué se hizo, problemas resueltos)
- **SDD**: Verificación con `/sdd-verify` si lo consideran necesario

### Qué se hizo
**Cleanup:**
- Removido `import { supabase }` de todos los archivos (grep verificado)
- `@supabase/supabase-js` eliminado de `package.json`
- `@prisma/adapter-pg` y `pg` instalados

**Verificación:**
- `npx prisma validate` → ✅ Schema válido
- `npm run test:ci` → ✅ 14 tests passed, 4 test suites
- `npx prisma migrate dev --name init` → ✅ Migración aplicada, tablas creadas

**Fix de infraestructura:**
- Puerto 5432 del host estaba ocupado por otro PostgreSQL (no Docker)
- Solución: mapear contenedor a `5433:5432`
- `.env` actualizado: `DATABASE_URL` usa `localhost:5433`
- `docker-compose.yml` actualizado: `ports: "5433:5432"`

**Tablas creadas:**
- `User` (uid PK, email unique)
- `Rifa` (id PK autoincrement)
- `Ticket` (id PK autoincrement)
- Relaciones correctamente definidas

### Resumen de la migración

| Archivo | Cambio |
|---------|--------|
| `package.json` | `@supabase/supabase-js` → `prisma`, `@prisma/client`, `@prisma/adapter-pg`, `pg` |
| `prisma/schema.prisma` | Nuevo — 3 modelos con relaciones |
| `prisma/migrations/` | Migración `20260601034250_init` aplicada |
| `src/db.js` | Supabase client → Prisma + pg adapter |
| `src/models/*.js` | Queries de Supabase → Prisma ORM |
| `src/controllers/*.js` | Imports actualizados |
| `src/test/*.js` | Mocks actualizados para Prisma |
| `.env` | `DATABASE_URL` con puerto 5433 |
| `docker-compose.yml` | Puerto mapeado a 5433 |

**Detalles técnicos guardados en engram:**
- Puerto 5432 del host estaba ocupado por PostgreSQL local, no por Docker
- `netstat -ano | findstr ":5432"` para diagnosticar conflictos de puerto
- Prisma 7 con `@prisma/adapter-pg` requiere `import pkg from '@prisma/client'; const { PrismaClient } = pkg` en ESM

---

## Resumen de archivos a modificar

| Archivo | Acción |
|---------|--------|
| `package.json` | Remover `@supabase/supabase-js`, agregar `prisma`, `@prisma/client` |
| `.env` | Reemplazar `SUPABASE_URL`, `SUPABASE_KEY` con `DATABASE_URL` (PostgreSQL) |
| `prisma/schema.prisma` | Nuevo archivo |
| `src/db.js` | Reescribir con Prisma client singleton |
| `src/models/user.model.js` | Refactorizar a Prisma |
| `src/models/rifa.model.js` | Refactorizar a Prisma |
| `src/models/ticket.models.js` | Refactorizar a Prisma |
| `src/controllers/auth.controllers.js` | Actualizar imports y llamadas |
| `src/controllers/rifa.controllers.js` | Actualizar imports y llamadas |
| `src/test/auth.controllers.test.js` | Actualizar mocks |
| `src/test/db.connection.test.js` | Actualizar verificación |