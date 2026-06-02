# Lost Tapes — Frontend

SPA de una tienda de cine de culto. Proyecto intermodular 2DAW.  
**Repo backend:** [AlexAlberoRibera/Lost-Tapes](https://github.com/AlexAlberoRibera/Lost-Tapes) (rama `rama-sprint5`)

---

## Índice

1. [Tecnologías](#tecnologías)
2. [Instalación y arranque](#instalación-y-arranque)
3. [Estructura del proyecto](#estructura-del-proyecto)
4. [Rutas](#rutas)
5. [Roles y permisos](#roles-y-permisos)
6. [Iteración 4 — SPA, autenticación y roles](#iteración-4--spa-autenticación-y-roles)
7. [Iteración 5/6 — Integraciones y diseño](#iteración-56--integraciones-y-diseño)
8. [Docker](#docker)
9. [Usuarios de prueba](#usuarios-de-prueba)
10. [Pendiente](#pendiente)
11. [Manual de usuario](#manual-de-usuario)

---

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Estado global | Pinia |
| Enrutamiento | Vue Router 4 |
| HTTP | Axios |
| Validación | VeeValidate 4 + Yup |
| UI / CSS | Bootstrap 5 |
| Build | Vite |

---

## Instalación y arranque

```bash
git clone https://github.com/ManelDAW/Lost-Tapes.git
cd Lost-Tapes
git checkout rama-sprint5
npm install
```

Crear el archivo `.env` en la raíz del frontend:

```env
VITE_API_URL=http://localhost:8000/api
```

```bash
npm run dev    # http://localhost:5173
```

El backend debe estar corriendo en `http://localhost:8000`. Ver instrucciones en el repo del backend.

---

## Estructura del proyecto

```
src/
├── assets/
│   ├── img/               # Imágenes locales y logo
│   ├── videos/            # Vídeo promocional
│   └── main.css           # Variables CSS globales y tema oscuro
├── components/
│   ├── NavBar.vue          # Navbar con búsqueda, sesión y dropdown de usuario
│   ├── FooterApp.vue       # Footer con widget de accesibilidad (tema oscuro)
│   ├── CardProducte.vue    # Tarjeta de película con hover effects
│   ├── CarruselApp.vue     # Carrusel del home con clic a detalle
│   └── VideoPromo.vue      # Reproductor de vídeo promocional
├── views/
│   ├── HomeView.vue          # Home: carrusel + películas destacadas
│   ├── AboutView.vue         # Nosotros + sección ASG Sostenibilidad
│   ├── ProductsView.vue      # Catálogo con paginación y filtros
│   ├── ProductDetailView.vue # Detalle: likes, comentarios, relacionadas
│   ├── ContactForm.vue       # Formulario de contacto validado
│   ├── LoginView.vue         # Login con email/password + botón Google
│   ├── AuthCallback.vue      # Callback OAuth2 Google
│   ├── ProfileView.vue       # Perfil de usuario editable
│   ├── VenderView.vue        # Formulario para añadir películas
│   └── AdminProductsView.vue # CRUD de películas (admin/vendedor)
├── stores/
│   └── movieStore.js       # Pinia: películas, usuario, login, logout, fetchMovies
├── services/
│   └── api.js              # Cliente Axios con interceptor de token Bearer
├── utils/
│   └── imageUrl.js         # Resuelve URL completa de imagen desde campo `image`
└── router/
    └── index.js            # Rutas y guards de navegación por rol
```

---

## Rutas

| URL | Vista | Acceso |
|-----|-------|--------|
| `/` | HomeView | Público |
| `/nosotros` | AboutView | Público |
| `/productos` | ProductsView | Público |
| `/productos/:id` | ProductDetailView | Público |
| `/contacto` | ContactForm | Público |
| `/login` | LoginView | Público |
| `/auth/callback` | AuthCallback | Público (callback OAuth) |
| `/perfil` | ProfileView | Requiere login |
| `/vender` | VenderView | admin / vendedor |
| `/admin/productos` | AdminProductsView | admin / vendedor |

---

## Roles y permisos

| Rol | Acceso |
|-----|--------|
| Sin sesión | Solo lectura: catálogo y detalles |
| editor | + comentarios y likes |
| vendedor | + añadir películas (`/vender`, `/admin/productos`) |
| admin | Acceso completo |

El guard de Vue Router bloquea rutas según rol:

```js
router.beforeEach((to) => {
  const user = store.user
  if (to.meta.requiresAuth && !user) return { name: 'login' }
  if (to.meta.roles && !to.meta.roles.includes(user?.role)) return { name: 'home' }
})
```

---

## Iteración 4 — SPA, autenticación y roles

### Servicio Axios (`src/services/api.js`)

Módulo central para todas las llamadas HTTP. Adjunta el token Sanctum en cada petición mediante un interceptor:

```js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```

No se usa `withCredentials: true` porque el CORS del backend devuelve `Access-Control-Allow-Origin: *` y el navegador bloquea esa combinación. Los tokens Bearer no tienen ese problema.

### Store Pinia (`src/stores/movieStore.js`)

- **`fetchMovies()`** — llama a `GET /api/products` y mapea campos del backend al formato del frontend (`name`→`title`, `description`→`desc`, etc.). Añade `likes: 0` y `comments: []` porque el backend no los devuelve.
- **`loginUser(email, password)`** — llama a `POST /api/login`, guarda el token en `localStorage` y el usuario en el store.
- **`logoutUser()`** — llama a `POST /api/logout`, limpia `localStorage` y borra el usuario del store.
- **`restoreSession()`** — al recargar la página, si hay token guardado llama a `GET /api/user` para recuperar la sesión sin pedir credenciales de nuevo.

### Utilidad de imágenes (`src/utils/imageUrl.js`)

Las imágenes están en el servidor Laravel en `/public/images/`. Esta función construye la URL completa:

```js
export function getImageUrl(movie) {
  const base = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/api$/, '')
  if (movie?.image) return `${base}/images/${movie.image}`
  return ''
}
```

Usada en `CardProducte.vue`, `CarruselApp.vue` y `ProductDetailView.vue`.

### Tema oscuro y accesibilidad

Variables CSS en `main.css` para tema claro/oscuro. El widget del footer añade `body.tema-oscuro` y todos los componentes cambian automáticamente:

```css
:root { --page-bg: #fff; --page-text: #111; --page-card-bg: #f5f5f5; ... }
body.tema-oscuro { --page-bg: #0d0d0d; --page-text: #e8e8e8; --page-card-bg: #1a1a1a; ... }
```

---

## Iteración 5/6 — Integraciones y diseño

### VeeValidate + Yup

Validación en tiempo real en todos los formularios:

| Formulario | Campos validados |
|------------|-----------------|
| Login | email (formato), password (mín. 4 caracteres) |
| Contacto | nombre (mín. 2), email (formato), asunto (requerido), mensaje (mín. 10) |
| Vender | título, duración, precio (número ≥ 0), descripción (mín. 10) |

Los errores aparecen debajo de cada campo con la clase Bootstrap `is-invalid`. Los `alert()` han sido eliminados.

### Paginación y filtros en el catálogo

**Archivo:** `src/views/ProductsView.vue`

- 6 películas por página con navegación Bootstrap
- Filtro por categoría (dropdown generado dinámicamente)
- Búsqueda por texto desde el NavBar (pasa `?q=` por URL)
- Botón "Limpiar filtros" solo cuando hay filtros activos
- Watcher resetea a página 1 al cambiar filtros
- Spinner de carga mientras `movieStore.loading` es `true`

### Hover effects en cards

**Archivo:** `src/components/CardProducte.vue`

- Lift `translateY(-6px)` + sombra al hacer hover
- Zoom `scale(1.06)` en la imagen
- Overlay con gradiente oscuro y texto "Ver detalle →"

### Carrusel mejorado

**Archivo:** `src/components/CarruselApp.vue`

- Clic en un slide navega al detalle de esa película
- `totalSlides` calculado desde los datos reales (`Math.min(3, peliculas.length)`)
- Autoavance cada 10 segundos con `setInterval`/`clearInterval`

### OAuth2 — Login con Google

**Archivos:** `src/views/AuthCallback.vue`, `src/views/LoginView.vue`

- Botón "Continuar con Google" redirige a `GET /auth/google` del backend
- `AuthCallback.vue` recibe `?token=`, `?name=`, `?role=` de la URL, guarda el token y establece la sesión
- Requiere credenciales configuradas en Google Cloud Console (ver backend)

### Películas relacionadas (C5 — Digitalización)

**Archivo:** `src/views/ProductDetailView.vue`

Sección "También te puede interesar" con hasta 3 películas de la misma categoría:

```js
const relatedMovies = computed(() => {
  if (!movie.value?.category) return [];
  return movieStore.peliculas
    .filter(p => p.id !== movie.value.id && p.category === movie.value.category)
    .slice(0, 3);
});
```

### Sostenibilidad ASG (C6)

**Archivo:** `src/views/AboutView.vue`

Sección al final de la página "Nosotros" con los tres pilares (Ambiental, Social, Gobernanza) y propuestas de mejora concretas.

---

## Docker

```bash
docker compose up
# Disponible en http://localhost:5173
```

Monta el código fuente como volumen para hot-reload. Imagen `node:20-alpine`.

---

## Usuarios de prueba

| Email | Contraseña | Rol |
|-------|-----------|-----|
| `admin@example.com` | `1234` | admin |
| `user@example.com` | `1234` | user |

---

## Pendiente

| Tarea | Motivo |
|-------|--------|
| OAuth2 Google funcional | Código listo — faltan credenciales reales de Google Console |
| DNS `pigrupox.ddaw.es` | Lo configura el compañero en AWS |
| CI/CD automatizado | Requiere acceso al servidor EC2 |
| HTTPS / Let's Encrypt | Requiere servidor en producción |

---

## Manual de usuario

### Navegar por la web

La barra de navegación superior está siempre visible. Desde ella puedes ir a Home, Nosotros, Contacto y Productos. Si has iniciado sesión, tu nombre aparece arriba a la derecha — haz clic para acceder al perfil o cerrar sesión.

### El catálogo

Ve a **Productos**. Puedes filtrar por categoría con el desplegable, buscar por texto desde el buscador del menú, o navegar entre páginas con los botones de paginación. El botón "Limpiar filtros" aparece cuando hay algún filtro activo.

### Detalle de una película

Haz clic en cualquier tarjeta o en una película del carrusel. Verás la portada, descripción, botón de me gusta, sección de comentarios y películas relacionadas de la misma categoría al pie de la página.

### Iniciar sesión

Ve a **Iniciar sesión**. Introduce tu email y contraseña. Si hay errores en el formulario aparecerán antes de enviar. También puedes pulsar **Continuar con Google** para autenticarte con tu cuenta de Google.

### Tu perfil

Una vez logueado, haz clic en tu nombre → **Mi perfil**. Puedes ver y editar tu nombre y correo electrónico.

### Cerrar sesión

Haz clic en tu nombre → **Cerrar sesión**.

### Añadir una película (vendedor/admin)

Ve a **Vender** en el menú. Rellena el formulario con título, duración, precio y descripción. Los campos se validan antes de enviar.

### Gestionar el catálogo (admin/vendedor)

Haz clic en tu nombre → **Gestionar productos**. Desde la tabla puedes editar o eliminar películas, y añadir nuevas con el botón "+ Añadir película".

### Tema oscuro

En el footer hay un widget de accesibilidad. Púlsalo para activar el tema oscuro y reducir la fatiga visual.

### Contacto

Ve a **Contacto**, rellena el formulario y pulsa Enviar. Verás un mensaje de confirmación si todo es correcto.
