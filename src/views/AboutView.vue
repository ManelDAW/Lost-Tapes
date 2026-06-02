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

    <!-- Sección de Sostenibilidad -->
    <div class="border-top mt-5 pt-5" style="border-color: var(--page-border) !important;" id="sostenibilidad">
      <h2 class="fw-bold mb-2" style="font-size:2rem; color: var(--page-text);">
        Compromiso con la Sostenibilidad
      </h2>
      <p class="mb-5" style="color: var(--page-muted); max-width:700px;">
        En Lost Tapes creemos que la tecnología y la cultura pueden ir de la mano con el respeto al
        medio ambiente y a la sociedad. Estos son nuestros principios ASG.
      </p>

      <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
        <div class="col">
          <div class="card h-100" style="background: var(--page-card-bg); border-color: var(--page-border);">
            <div class="card-body">
              <div class="fs-2 mb-3">🌱</div>
              <h5 class="card-title fw-bold" style="color: var(--page-text);">Ambiental</h5>
              <ul class="small ps-3 mb-0" style="color: var(--page-muted);">
                <li class="mb-2">
                  Distribución 100% digital: sin fabricación de DVDs ni embalajes físicos,
                  reduciendo residuos plásticos y emisiones de transporte.
                </li>
                <li class="mb-2">
                  Infraestructura en la nube con instancias dimensionadas al uso real,
                  evitando el consumo energético de servidores ociosos.
                </li>
                <li>
                  Optimización de imágenes y assets para reducir el ancho de banda
                  consumido por cada visita.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100" style="background: var(--page-card-bg); border-color: var(--page-border);">
            <div class="card-body">
              <div class="fs-2 mb-3">🤝</div>
              <h5 class="card-title fw-bold" style="color: var(--page-text);">Social</h5>
              <ul class="small ps-3 mb-0" style="color: var(--page-muted);">
                <li class="mb-2">
                  Accesibilidad web: widget WCAG integrado para personas con necesidades
                  visuales, motoras o cognitivas.
                </li>
                <li class="mb-2">
                  Preservación del patrimonio cinematográfico: rescatamos obras de cine de
                  autor que de otro modo caerían en el olvido.
                </li>
                <li>
                  Plataforma abierta: cualquier usuario puede registrarse, comentar y
                  compartir su pasión por el cine independiente.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100" style="background: var(--page-card-bg); border-color: var(--page-border);">
            <div class="card-body">
              <div class="fs-2 mb-3">⚖️</div>
              <h5 class="card-title fw-bold" style="color: var(--page-text);">Gobernanza</h5>
              <ul class="small ps-3 mb-0" style="color: var(--page-muted);">
                <li class="mb-2">
                  Código abierto y documentado: el repositorio del proyecto es público,
                  auditado y con historial de cambios transparente en GitHub.
                </li>
                <li class="mb-2">
                  Autenticación segura con tokens Sanctum y OAuth2, sin almacenar
                  contraseñas en texto plano ni sesiones inseguras.
                </li>
                <li>
                  Control de roles (admin / vendedor / editor) para asegurar que cada
                  usuario solo accede a lo que le corresponde.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 rounded" style="background: var(--page-card-bg); border: 1px solid var(--page-border);">
        <h5 class="fw-bold mb-2" style="color: var(--page-text);">Propuestas de mejora</h5>
        <p class="small mb-3" style="color: var(--page-muted);">
          Aunque Lost Tapes es un proyecto académico, estas serían las siguientes medidas a
          implementar en un entorno de producción real:
        </p>
        <div class="row row-cols-1 row-cols-md-2 g-3">
          <div class="col">
            <div class="d-flex gap-2 align-items-start">
              <span style="color:var(--accent); font-size:1.1rem;">→</span>
              <p class="small mb-0" style="color: var(--page-muted);">
                <strong style="color: var(--page-text);">Hosting verde:</strong>
                migrar a proveedores cloud con certificación de energía 100% renovable.
              </p>
            </div>
          </div>
          <div class="col">
            <div class="d-flex gap-2 align-items-start">
              <span style="color:var(--accent); font-size:1.1rem;">→</span>
              <p class="small mb-0" style="color: var(--page-muted);">
                <strong style="color: var(--page-text);">Política de privacidad:</strong>
                redactar un aviso legal completo conforme al RGPD y la LSSI.
              </p>
            </div>
          </div>
          <div class="col">
            <div class="d-flex gap-2 align-items-start">
              <span style="color:var(--accent); font-size:1.1rem;">→</span>
              <p class="small mb-0" style="color: var(--page-muted);">
                <strong style="color: var(--page-text);">Lazy loading de imágenes:</strong>
                cargar las portadas solo cuando entran en el viewport, reduciendo
                datos transferidos en un ~40%.
              </p>
            </div>
          </div>
          <div class="col">
            <div class="d-flex gap-2 align-items-start">
              <span style="color:var(--accent); font-size:1.1rem;">→</span>
              <p class="small mb-0" style="color: var(--page-muted);">
                <strong style="color: var(--page-text);">CDN para assets estáticos:</strong>
                servir imágenes y vídeos desde una red de distribución para reducir latencia
                y consumo de CPU del servidor principal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
