<template>
  <div class="container py-5">
    <h1 class="fw-bold mb-3" style="font-size:2.4rem;">Sobre Lost Tapes</h1>
    <p class="lead mb-5" style="color: var(--page-muted); max-width:700px;">
      Lost Tapes es una tienda especializada en cine de culto: películas que el tiempo ha enterrado
      y que merecen ser rescatadas. Nuestro catálogo reúne joyas del cine de autor, obras olvidadas
      y películas que desafiaron las convenciones de su época.
    </p>

    <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
      <div class="col">
        <div class="card h-100" style="background: var(--page-card-bg); border-color: var(--page-border);">
          <div class="card-body">
            <div class="fs-2 mb-3">🎬</div>
            <h5 class="card-title fw-bold" style="color: var(--page-text);">Nuestra misión</h5>
            <p class="card-text small" style="color: var(--page-muted);">
              Recuperar y difundir películas que han quedado fuera de los circuitos comerciales,
              dándoles la visibilidad que merecen entre los amantes del cine.
            </p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100" style="background: var(--page-card-bg); border-color: var(--page-border);">
          <div class="card-body">
            <div class="fs-2 mb-3">🎞️</div>
            <h5 class="card-title fw-bold" style="color: var(--page-text);">¿Qué encontrarás?</h5>
            <p class="card-text small" style="color: var(--page-muted);">
              Cine japonés de los años 60, nuevas olas europeas, cine de autor de Europa del Este
              y muchas otras obras que no encontrarás en las grandes plataformas.
            </p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100" style="background: var(--page-card-bg); border-color: var(--page-border);">
          <div class="card-body">
            <div class="fs-2 mb-3">💬</div>
            <h5 class="card-title fw-bold" style="color: var(--page-text);">La comunidad</h5>
            <p class="card-text small" style="color: var(--page-muted);">
              Regístrate para dejar comentarios, dar me gusta a tus películas favoritas
              y estar al tanto de las nuevas incorporaciones al catálogo.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="border-top pt-4" style="border-color: var(--page-border) !important;">
      <h5 class="fw-bold mb-2" style="color: var(--page-text);">Proyecto académico</h5>
      <p style="color: var(--page-muted); font-size:0.95rem;">
        Lost Tapes es el proyecto intermodular del ciclo de
        <strong style="color: var(--page-text);">Desarrollo de Aplicaciones Web (DAW)</strong>.
        Desarrollado con Vue 3, Pinia, Vue Router y Laravel.
      </p>
    </div>
  </div>
</template>
