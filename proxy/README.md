# Proxy Nginx - TuRifa

Reverse proxy nginx para TuRifa. El único componente expuesto a internet.

## Arquitectura

```
Internet → Traefik (Dokploy) → Nginx Proxy → Backend (red interna)
                                      → Frontend (red interna)
```

## Variables de Entorno

| Variable | Default | Descripción |
|----------|---------|-------------|
| `PORT` | `8443` | Puerto expuesto |
| `SERVER_NAME` | `localhost` | Dominio |
| `BACKEND_UPSTREAM` | `turifa-backend:3000` | Host:puerto del backend |
| `FRONTEND_UPSTREAM` | `turifa-frontend:80` | Host:puerto del frontend |

## Construcción

```bash
cd proxy
docker build -t turifa-proxy .
```

## Uso en Dokploy

### 1. Crear la Docker network

```bash
docker network create turifa-network
```

### 2. Configurar variables en Dokploy

```
PORT=8443
SERVER_NAME=turifa.midominio.com
BACKEND_UPSTREAM=turifa-backend:3000
FRONTEND_UPSTREAM=turifa-frontend:80
```

### 3. Conectar servicios

Asegurate que backend y frontend estén en la misma network.

## Endpoints

| Path | Destino | Descripción |
|------|---------|-------------|
| `/api/*` | backend:3000 | API del backend |
| `/*` | frontend:80 | Frontend React SPA |
| `/health` | - | Health check (200 OK) |

## Seguridad

- **Rate limiting**: 30r/s API, 50r/s general
- **Security headers**: HSTS, X-Frame-Options, CSP, etc.
- **Bloqueo archivos sensibles**: `.env`, `.log`, `.sql`, etc.
- **SSL**: manejado por Traefik/Dokploy

## Health Check

```bash
curl http://localhost:8443/health
# → OK
```