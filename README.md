# Lost Tapes

SPA (Single Page Application) de una tienda de cine de culto. Proyecto intermodular del ciclo de **Desarrollo de Aplicaciones Web (DAW)**.

---

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Frontend | Vue 3 (Composition API) |
| CSS / UI | Bootstrap 5 |
| Build | Vite |
| Estado global | Pinia |
| Enrutamiento | Vue Router 4 |
| Backend (futuro) | Laravel + Sanctum |
| Base de datos | MySQL |

---

## Instalación y arranque

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:5173)
npm run dev

# Build de producción
npm run build
```

---

## Estructura del proyecto

```
src/
├── assets/
│   ├── img/
│   │   ├── peliculas/       # Carpeta por película (ej: harakiri/1.jpg)
│   │   └── Logo_Tapes.png
│   ├── videos/              # Vídeo promocional
│   └── main.css             # Estilos globales y variables CSS
├── components/
│   ├── NavBar.vue           # Barra de navegación con búsqueda y sesión
│   ├── FooterApp.vue        # Pie de página con widget de accesibilidad
│   ├── CardProducte.vue     # Tarjeta de película (catálogo y home)
│   ├── CarruselApp.vue      # Carrusel de imágenes del home
│   └── VideoPromo.vue       # Reproductor de vídeo promocional
├── views/
│   ├── HomeView.vue         # Página principal con carrusel y destacados
│   ├── AboutView.vue        # Información sobre el proyecto
│   ├── ProductsView.vue     # Catálogo con búsqueda por query
│   ├── ProductDetailView.vue # Detalle de película: likes y comentarios
│   ├── ContactForm.vue      # Formulario de contacto
│   ├── LoginView.vue        # Formulario de inicio de sesión
│   ├── ProfileView.vue      # Perfil de usuario editable
│   ├── VenderView.vue       # Formulario para añadir películas (vendedor/admin)
│   └── AdminProductsView.vue # Gestión CRUD de películas (vendedor/admin)
├── stores/
│   └── movieStore.js        # Store Pinia: películas, usuario, acciones
├── services/
│   └── api.js               # Funciones Axios preparadas para Laravel
└── router/
    └── index.js             # Rutas y guards de navegación
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
| `/login` | LoginView | Solo sin sesión |
| `/perfil` | ProfileView | Requiere login |
| `/vender` | VenderView | admin / vendedor |
| `/admin/productos` | AdminProductsView | admin / vendedor |

---

## Roles y usuarios de prueba

Mientras no está conectado el backend de Laravel, el login usa usuarios simulados:

| Email | Contraseña | Rol |
|-------|-----------|-----|
| `admin@losttapes.com` | `1234` | admin |
| `vendedor@losttapes.com` | `1234` | vendedor |
| `editor@losttapes.com` | `1234` | editor |

### Permisos por rol

- **admin** y **vendedor**: acceden a `/vender` y `/admin/productos`, ven enlace "Vender" y "Gestionar productos" en el menú.
- **editor**: solo puede ver el catálogo y dejar comentarios/likes.
- **Sin sesión**: acceso de solo lectura, no puede interactuar con películas.

---

## Control de acceso (Vue Router Guards)

El archivo `router/index.js` protege las rutas mediante `beforeEach`:

```js
router.beforeEach((to) => {
  const store = useMovieStore()
  const user = store.user

  if (to.meta.requiresAuth && !user) return { name: 'login' }
  if (to.meta.roles && !to.meta.roles.includes(user?.role)) return { name: 'home' }
})
```

---

## Tema oscuro

El footer incluye un widget de accesibilidad que añade la clase `body.tema-oscuro`. Todos los componentes usan variables CSS definidas en `main.css` para adaptarse automáticamente:

```css
:root {
  --page-bg: #fff;
  --page-text: #111;
  --page-muted: #555;
  --page-card-bg: #f5f5f5;
  --page-border: #e0e0e0;
  --page-input-bg: #f0f0f0;
}

body.tema-oscuro {
  --page-bg: #0d0d0d;
  --page-text: #e8e8e8;
  --page-muted: #aaa;
  --page-card-bg: #1a1a1a;
  --page-border: #2a2a2a;
  --page-input-bg: #111;
}
```

---

## Imágenes de películas

Cada película tiene una propiedad `folder` que apunta a una subcarpeta dentro de `src/assets/img/peliculas/`. La imagen principal siempre se llama `1.jpg`:

```
src/assets/img/peliculas/
├── harakiri/
│   └── 1.jpg
├── brandedToKill/
│   └── 1.jpg
└── andreiRublev/
    └── 1.jpg
```

---

## Iteraciones del proyecto

| Iteración | Descripción | Estado |
|-----------|-------------|--------|
| 1 | HTML + CSS estático | ✅ |
| 2 | PHP + MySQL básico | ✅ |
| 3 | JavaScript vanilla + Bootstrap | ✅ |
| 4 | SPA con Vue 3 + control de roles | ✅ |
| 5 | Integración con backend Laravel | 🔄 Pendiente |
| 6 | Despliegue en producción | 🔄 Pendiente |

---

## Bootstrap y responsividad

Bootstrap 5 se importa en `src/main.js` (CSS + JS bundle). Todos los componentes y vistas usan clases Bootstrap para layout, formularios, tablas y componentes interactivos.

### Cambios de integración Bootstrap

#### `src/main.js`
- Añadidas las importaciones de Bootstrap CSS y JS bundle antes del CSS propio.

#### `src/assets/main.css`
- Mantenidas las variables CSS propias (`--page-bg`, `--page-text`, etc.) para el tema oscuro.
- Añadidas sobreescrituras de variables Bootstrap en `body.tema-oscuro` (`--bs-body-bg`, `--bs-card-bg`, `--bs-border-color`, etc.) para que el toggle de accesibilidad afecte también a los componentes Bootstrap.
- Añadida clase `.btn-accent` reutilizable (botón naranja `#ff6600`).
- Extraído el diseño film-strip a clases globales `.film-wrap`, `.film-edge`, `.film-content` para evitar duplicación en Login, Contacto y Vender.

#### `src/components/NavBar.vue`
- Reescrito con `navbar navbar-expand-lg navbar-dark fixed-top`.
- Hamburger menu funcional con `data-bs-toggle="collapse"` para móvil.
- Dropdown de usuario usando Bootstrap `dropdown` con `data-bs-toggle="dropdown"`.
- Función `closeNavbar()` que cierra programáticamente el collapse al navegar con Vue Router.
- Búsqueda con `form-control form-control-sm`.

#### `src/components/CardProducte.vue`
- Reescrito usando `card`, `card-img-top`, `card-body`, `card-title`, `card-text`.
- Altura uniforme con `h-100` para que las cards en grid sean iguales en altura.

#### `src/views/HomeView.vue`
- Grid de películas con `row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4`.

#### `src/views/ProductsView.vue`
- Grid con `row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4`.
- Mensaje "sin resultados" con `alert alert-secondary`.
- Eliminado CSS scoped (toda la responsividad con Bootstrap).

#### `src/views/AboutView.vue`
- Cards de características con `row row-cols-1 row-cols-md-3 g-4`.
- Eliminado CSS scoped.

#### `src/views/ContactForm.vue`
- Formulario con `form-control`, `form-label`, `form-check`, `btn btn-light`.
- Estructura film-strip usando las clases globales `.film-wrap`.

#### `src/views/LoginView.vue`
- Formulario con `form-control`, `btn btn-light`.
- Error con `alert alert-danger`.
- Estructura film-strip usando las clases globales `.film-wrap`.

#### `src/views/VenderView.vue`
- Formulario con `form-control`, `btn btn-light`.
- Estructura film-strip usando las clases globales `.film-wrap`.

#### `src/views/ProfileView.vue`
- Layout de tarjeta de perfil con clases Bootstrap (`card`, `badge rounded-pill`).
- Formulario de edición con `form-control`, `btn`.

#### `src/views/ProductDetailView.vue`
- Layout imagen + info con `row col-12 col-md-4 col-lg-3`.
- Botón like con `btn rounded-pill`.
- Formulario de comentarios con `form-control`, `btn btn-accent`.
- Cards de comentarios con Bootstrap `card`.
- Eliminado CSS scoped.

#### `src/views/AdminProductsView.vue`
- Tabla con `table table-bordered table-hover table-responsive`.
- Columnas ocultadas en móvil con `d-none d-md-table-cell` y `d-none d-lg-table-cell`.
- Modal reescrito con estructura Bootstrap (`modal modal-dialog modal-content modal-header modal-body modal-footer`).
- Botones con `btn btn-warning`, `btn btn-danger`, `btn btn-accent`.

#### `src/App.vue`
- `padding-top` ajustado a `70px` (altura del navbar Bootstrap `fixed-top`).

---

## Backend

El backend en Laravel se encuentra en el repositorio [AlexAlberoRibera/Lost-Tapes](https://github.com/AlexAlberoRibera/Lost-Tapes), rama `documentacionApi`. Incluye autenticación con Sanctum y API REST para películas y usuarios. La conexión se realizará en la Iteración 5.
