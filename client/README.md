# TuRifa — Frontend

Rifa platform frontend built with React 19, Vite, Tailwind CSS v4, Zustand y react-router-dom v7.

## Requisitos

- **Node.js** 18+ (LTS recomendado)
- **npm** 9+ o **bun** 1.x

## Instalación

```bash
# 1. Ir al directorio client
cd client

# 2. Instalar dependencias
npm install

# 3. Copiar variables de entorno
cp .env.example .env

# 4. Llenar las variables en .env (ver sección Variables de Entorno)

# 5. Iniciar dev server
npm run dev
```

El app corre en `http://localhost:5173` por defecto.

## Scripts

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia dev server con HMR |
| `npm run build` | Build de producción (genera `dist/`) |
| `npm run preview` | Preview del build de producción |
| `npm run lint` | Linting con ESLint |
| `npm test` | Tests con Vitest |

## Variables de Entorno

Crear un archivo `.env` en la raíz de `client/` con las siguientes variables:

```env
# Backend API URL
VITE_API_BACKEND_URL=http://localhost:3000

# Firebase Configuration
VITE_APIKEY=tu_api_key_de_firebase
VITE_AUTHDOMAIN=tu_proyecto.firebaseapp.com
VITE_PROJECTID=tu_proyecto_id
VITE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_MESSAGING_SENDER_ID=123456789
VITE_APP_ID=1:123456789:web:abcdef123456
```

### Firebase Setup

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un proyecto o selecciona uno existente
3. En "Project Settings" > "General" > "Your apps" > Web app
4. Copia las variables de configuración (apiKey, authDomain, projectId, etc.)
5. Habilita **Authentication** > **Google** como provider

### Backend API

El frontend espera que el backend esté corriendo en `VITE_API_BACKEND_URL`.

Para desarrollo local, ajustar según la URL del backend (default: `http://localhost:3000`).

## Arquitectura

```
src/
├── api/              # Llamadas HTTP (auth.js, rifa.js, ticket.js)
├── assets/           # Archivos estáticos (SVG, imágenes)
├── components/
│   ├── sections/     # Secciones de página reutilizables
│   └── ui/           # Componentes de interfaz (Button, Card, Modal)
├── hooks/            # Hooks personalizados (lógica de negocio)
├── layout/           # Layout principal (Header, Footer, AppLayout)
├── pages/            # Páginas (composición de sections + hooks)
├── router/           # Configuración de rutas (createBrowserRouter)
├── storage/           # Stores de Zustand (estado global)
├── types/            # Definiciones de tipos
└── utils/            # Utilidades (api.js con interceptors axios)
```

### Patrones Clave

- **Pages = JSX puro**: Las páginas solo componen componentes, toda la lógica va en hooks
- **Stores en `storage/`**: Zustand stores para estado global con persistencia
- **Interceptores de API**: `src/utils/api.js` centraliza axios con manejo de auth y errores
- **Lazy loading**: Rutas cargadas con `React.lazy()` para code splitting automático

### API Layer

`src/utils/api.js` proporciona:
- Instancia axios centralizada con `baseURL` desde `VITE_API_BACKEND_URL`
- **Request interceptor**: Injecta `Authorization: Bearer {token}` desde `localStorage.firebase-token`
- **Response interceptor**: Maneja errores 401 (logout), 500, network errors

## Deployment

### Vercel

1. Conectar repo en [vercel.com](https://vercel.com)
2. Framework preset: **Vite**
3. Root directory: `client`
4. Environment variables: agregar las del `.env`
5. Deploy

### Docker

```bash
# Build image
docker build -t turifa-client ./client

# Run container
docker run -p 5173:80 turifa-client
```

El `Dockerfile` ya está configurado para servir archivos estáticos.

## Path Aliases

El proyecto usa path aliases para imports limpios:

```js
'@hooks'       → './src/hooks'
'@components'  → './src/components'
'@storage'     → './src/storage'
'@types'       → './src/types'
'@pages'       → './src/pages'
'@router'      → './src/router'
'@utils'       → './src/utils'
'@layout'      → './src/layout'
'@assets'      → './src/assets'
'@api'         → './src/api'
```

## Troubleshooting

### "Module not found" errors

Verificar que los path aliases en `vite.config.js` coinciden con los imports.

### Auth no funciona

1. Verificar que `VITE_API_BACKEND_URL` apunta al backend correcto
2. Verificar que Firebase config está completa en `.env`
3. Limpiar localStorage: `localStorage.clear()` y hacer login de nuevo

### Build falla

1. `npm run dev` funciona pero build no: revisar imports con paths relativos
2. Verificar que `CardRifa` se importa desde `@components/ui/CardRifa.jsx`

## Convenciones

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Pages | PascalCase | `Inicio.jsx` |
| Components | PascalCase | `HeroSection.jsx` |
| Hooks | camelCase + `use` | `useAuthInit.js` |
| Stores | camelCase + `use` | `useAuthStore.js` |
| Utils | camelCase | `api.js` |

---

**Stack**: React 19, Vite 6, Tailwind CSS v4, Zustand 5, react-router-dom 7, Firebase 11, Axios