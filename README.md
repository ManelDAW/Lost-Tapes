# Lost Tapes

SPA (Single Page Application) de una tienda de cine de culto. Proyecto intermodular del ciclo de **Desarrollo de Aplicaciones Web (DAW)**.

---

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Frontend | Vue 3 (Composition API) |
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

## Backend

El backend en Laravel se encuentra en el repositorio [AlexAlberoRibera/Lost-Tapes](https://github.com/AlexAlberoRibera/Lost-Tapes), rama `documentacionApi`. Incluye autenticación con Sanctum y API REST para películas y usuarios. La conexión se realizará en la Iteración 5.
