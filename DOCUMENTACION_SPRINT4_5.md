# Sprint 4 y 5 — Documentación de cambios

Resumen de todo lo implementado durante los Sprints 4 y 5 del proyecto Lost Tapes.  
Repos: frontend `ManelDAW/Lost-Tapes`, backend `AlexAlberoRibera/Lost-Tapes` (rama `rama-sprint5`).

---

## Sprint 4 — Conexión real frontend ↔ backend

### Reorganización del proyecto

Los dos repositorios estaban en carpetas separadas. Se movieron a una carpeta contenedora para tener todo junto:

```
/home/batoi/Actividades/proyecto-lost-tapes/
├── frontend/
└── backend/
```

En el backend se renombró la rama `Proyecto_claudio` a `rama-sprint5`. En el frontend se creó `rama-sprint5` nueva desde `main`.

---

### Servicio Axios

**Archivo:** `src/services/api.js` *(nuevo)*

Se creó un módulo central para todas las llamadas HTTP al backend. Incluye un interceptor que adjunta el token Sanctum en cada petición:

```js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```

No se usa `withCredentials: true` porque el backend tiene `Access-Control-Allow-Origin: *` y el navegador bloquea esa combinación. Como la autenticación es por token Bearer (no por cookie), no hace falta.

Funciones exportadas: `getMovies`, `getMovie`, `createMovie`, `updateMovie`, `deleteMovie`, `login`, `logout`, `getProfile`.

---

### Variable de entorno

**Archivo:** `.env` *(nuevo)*

```env
VITE_API_URL=http://localhost:8000/api
```

Usada en `api.js` y en `imageUrl.js` para no hardcodear la URL del servidor.

---

### Store conectado a la API

**Archivo:** `src/stores/movieStore.js`

Antes el store tenía datos hardcodeados. Se reemplazó todo por llamadas reales.

**`fetchMovies()`** — llama a `GET /api/products` y mapea los campos del backend al formato que usa el frontend:

| Campo backend | Campo frontend |
|---------------|----------------|
| `name`        | `title`        |
| `description` | `desc`         |
| `image`       | `image`        |
| *(no existe)* | `likes: 0`     |
| *(no existe)* | `comments: []` |

Maneja tanto respuestas paginadas `{ data: [...] }` como arrays planos.

**`loginUser(email, password)`** — llama a `POST /api/login`, guarda el token en `localStorage` con clave `auth_token`, guarda `{ id, name, email, role }` en el store. Si el backend no responde devuelve `"No se puede conectar con el servidor."` en vez de crashear.

**`logoutUser()`** — llama a `POST /api/logout`, limpia el `localStorage` y borra el usuario del store.

**`restoreSession()`** — al recargar la página, si hay token guardado llama a `GET /api/user` para recuperar los datos del usuario sin volver a pedir contraseña.

---

### Rutas de autenticación en el backend

**Archivo:** `backend/routes/api.php`

Se añadieron tres rutas que no existían:

- `POST /api/login` — valida credenciales, crea token Sanctum, devuelve `{ token, user }`
- `POST /api/logout` — elimina el token actual (protegido con `auth:sanctum`)
- `GET /api/user` — devuelve los datos del usuario autenticado (protegido con `auth:sanctum`)

---

### Trait `HasApiTokens` en el modelo User

**Archivo:** `backend/app/Models/User.php`

`createToken()` lanzaba error porque el modelo no tenía el trait de Sanctum:

```php
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable {
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = ['name', 'email', 'password', 'role', 'google_id'];
}
```

---

### Utilidad de URLs de imagen

**Archivo:** `src/utils/imageUrl.js` *(nuevo)*

Las imágenes están en el servidor Laravel en `/public/images/`. Se creó una función compartida para construir la URL completa desde el campo `image` que devuelve la API:

```js
export function getImageUrl(movie) {
  const base = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/api$/, '')
  if (movie?.image) return `${base}/images/${movie.image}`
  return ''
}
```

Se usa en `CardProducte.vue`, `CarruselApp.vue` y `ProductDetailView.vue`.

---

### Base de datos MySQL local

El backend venía configurado con SQLite. Se migró a MySQL:

1. `sudo systemctl start mysql`
2. Crear usuario y BD:
```sql
CREATE DATABASE losttapes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'losttapes'@'localhost' IDENTIFIED BY 'losttapes123';
GRANT ALL PRIVILEGES ON losttapes.* TO 'losttapes'@'localhost';
```
3. Actualizar `backend/.env` con `DB_CONNECTION=mysql`, `DB_HOST=127.0.0.1`, `DB_DATABASE=losttapes`, etc.
4. `php artisan migrate --seed`

*(Nota: en Ubuntu, el usuario `root` de MySQL requiere `sudo`. Por eso se crea un usuario dedicado.)*

---

## Sprint 5 — Funcionalidades avanzadas

### VeeValidate + Yup

**Archivos:** `src/views/LoginView.vue`, `src/views/ContactForm.vue`, `src/views/VenderView.vue`

**Paquetes instalados:** `vee-validate`, `@vee-validate/rules`, `yup`

Cada formulario usa `useForm({ validationSchema })` con un esquema Yup. Los errores aparecen debajo de cada campo en tiempo real con la clase Bootstrap `is-invalid`.

| Formulario | Campos validados |
|------------|-----------------|
| Login | email (formato), password (mín. 4 caracteres) |
| Contacto | nombre (mín. 2), email (formato), asunto (obligatorio), mensaje (mín. 10) |
| Vender | título, duración, precio (número ≥ 0), descripción (mín. 10) |

Los `alert()` del formulario de contacto se eliminaron. El formulario de contacto muestra un mensaje de éxito tras el envío y un botón para resetear.

---

### Paginación y filtros en el catálogo

**Archivo:** `src/views/ProductsView.vue`

- 6 películas por página con navegación numérica Bootstrap.
- Filtro por categoría: desplegable generado dinámicamente desde las categorías únicas de la lista.
- Búsqueda por texto: lee `?q=` de la URL (el buscador del NavBar redirige aquí con ese parámetro).
- Botón "Limpiar filtros" que aparece solo cuando hay algún filtro activo.
- Spinner de carga mientras `movieStore.loading` es `true`.
- Contador de resultados: "X películas para 'término'".
- Watcher sobre los filtros para resetear a página 1 al cambiar criterios.

---

### Hover effects en las cards

**Archivo:** `src/components/CardProducte.vue`

- Al hacer hover: la card sube 6px (`translateY(-6px)`) y aparece sombra.
- La imagen hace zoom suave (`scale(1.06)`).
- Aparece un overlay con gradiente oscuro en la parte inferior mostrando "Ver detalle →". Sin fondo opaco para no tapar la foto.

---

### Carrusel mejorado

**Archivo:** `src/components/CarruselApp.vue`

- Click en el slide navega a la página de detalle de esa película (`/productos/:id`).
- `totalSlides` es reactivo y calculado desde las películas cargadas (`Math.min(3, peliculas.length)`), por lo que no falla si hay menos de 3.
- Usa `getImageUrl(movie)` de la utilidad compartida, en vez de intentar construir la ruta desde `folder`.
- Autoavance cada 10 segundos con `setInterval` / `clearInterval` en `onMounted` / `onUnmounted`.

---

### OAuth2 — Login con Google

**Archivos frontend:** `src/views/AuthCallback.vue` *(nuevo)*, `src/views/LoginView.vue`, `src/router/index.js`

**Archivos backend:** `app/Http/Controllers/Auth/SocialAuthController.php` *(nuevo)*, `config/services.php`, `routes/web.php`

**Paquete instalado (backend):** `laravel/socialite`

Flujo:
1. El usuario pulsa "Continuar con Google" en el login → redirige a `GET /auth/google`.
2. Socialite redirige a Google con `client_id`, `redirect_uri` y `scope`.
3. Google devuelve al callback `/auth/google/callback`.
4. Backend hace `updateOrCreate` del usuario por email, crea token Sanctum, redirige al frontend a `/auth/callback?token=X&name=Y&role=Z`.
5. `AuthCallback.vue` lee los parámetros, guarda el token en `localStorage`, establece el usuario en el store y redirige al home.

Variables necesarias en `backend/.env`:
```
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
FRONTEND_URL=http://localhost:5173
```

Las credenciales se obtienen en Google Cloud Console → APIs y servicios → Credenciales → OAuth 2.0.  
**Estado:** código listo, pendiente configurar las credenciales reales.

---

### Películas relacionadas (Digitalización)

**Archivo:** `src/views/ProductDetailView.vue`

Al pie de la página de detalle aparece la sección "También te puede interesar" con hasta 3 películas de la misma categoría:

```js
const relatedMovies = computed(() => {
  if (!movie.value?.category) return [];
  return movieStore.peliculas
    .filter(p => p.id !== movie.value.id && p.category === movie.value.category)
    .slice(0, 3);
});
```

La sección solo se muestra si hay al menos una película relacionada.

---

### Sección de Sostenibilidad ASG

**Archivos:** `src/views/AboutView.vue`, `src/components/NavBar.vue`

Se añadió una sección con los tres pilares ASG al final de la página "Nosotros":

- **Ambiental** — distribución digital sin residuos físicos, infraestructura cloud dimensionada, optimización de assets.
- **Social** — accesibilidad WCAG, preservación del patrimonio cinematográfico, plataforma comunitaria abierta.
- **Gobernanza** — código abierto en GitHub, autenticación segura con Sanctum + OAuth2, control de roles.
- **Propuestas de mejora** — hosting verde, política de privacidad RGPD, lazy loading de imágenes, CDN.

Enlace "Sostenibilidad" añadido al NavBar que lleva a `/nosotros#sostenibilidad`.

---

### Docker Compose

**Archivos:** `frontend/docker-compose.yml` *(nuevo)*, `backend/docker-compose.yml` *(nuevo)*, `backend/docker/nginx.conf` *(nuevo)*

Frontend — node:20-alpine con volumen para hot-reload:
```bash
docker compose up   # disponible en http://localhost:5173
```

Backend — tres servicios:

| Servicio | Imagen | Puerto |
|----------|--------|--------|
| `app` | PHP 8.2-fpm | — |
| `webserver` | nginx:alpine | 8000 |
| `db` | mysql:8.0 | 3306 |

```bash
docker compose up -d
docker compose exec app php artisan migrate --seed  # primera vez
```

---

## Cómo arrancar el proyecto en local

```bash
# Backend
cd backend
sudo systemctl start mysql
php artisan serve          # http://localhost:8000

# Frontend (otra terminal)
cd frontend
npm run dev                # http://localhost:5173
```

---

## Pendiente (depende del servidor de producción)

| Tarea | Motivo |
|-------|--------|
| CI/CD automatizado | Requiere acceso al servidor EC2 |
| HTTPS / Let's Encrypt | Requiere servidor en producción |
| DNS `pigrupox.ddaw.es` | Requiere instancia AWS |
| Arquitectura AWS documentada | La monta el compañero con acceso |
| OAuth2 Google funcional | Código listo, faltan credenciales reales de Google Console |

---

## Usuarios de prueba

| Email | Contraseña | Rol |
|-------|-----------|-----|
| `admin@example.com` | `1234` | admin |
| `user@example.com` | `1234` | user |
