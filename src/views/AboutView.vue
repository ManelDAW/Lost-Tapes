<template>
  <!-- ── BANNER ─────────────────────────────────────────────────── -->
  <section class="about-banner">
    <div class="about-banner__inner">
      <span class="about-tag">Sobre nosotros</span>
      <h1 class="about-banner__title">Cine que merece<br/><span>ser recordado</span></h1>
      <div class="about-rule"></div>
      <p class="about-banner__sub">
        Lost Tapes es una tienda especializada en cine de culto: películas que el tiempo
        ha enterrado y que merecen ser rescatadas.
      </p>
    </div>
  </section>

  <div class="container-xl">

    <!-- ── MISIÓN ─────────────────────────────────────────────────── -->
    <section class="about-section">
      <div class="row g-0">
        <div class="col-12 col-md-4 about-block">
          <span class="about-num">01</span>
          <h3 class="about-block__title">Nuestra misión</h3>
          <p class="about-block__text">
            Recuperar y difundir películas que han quedado fuera de los circuitos comerciales,
            dándoles la visibilidad que merecen entre los amantes del cine.
          </p>
        </div>
        <div class="col-12 col-md-4 about-block">
          <span class="about-num">02</span>
          <h3 class="about-block__title">¿Qué encontrarás?</h3>
          <p class="about-block__text">
            Cine japonés de los años 60, nuevas olas europeas, cine de autor de Europa del Este
            y muchas otras obras que no encontrarás en las grandes plataformas.
          </p>
        </div>
        <div class="col-12 col-md-4 about-block">
          <span class="about-num">03</span>
          <h3 class="about-block__title">La comunidad</h3>
          <p class="about-block__text">
            Regístrate para dejar comentarios, dar me gusta a tus películas favoritas
            y estar al tanto de las nuevas incorporaciones al catálogo.
          </p>
        </div>
      </div>
    </section>

    <!-- ── PROYECTO ACADÉMICO ─────────────────────────────────────── -->
    <section class="about-section">
      <div class="about-academic">
        <div class="about-academic__left">
          <span class="about-tag">Stack técnico</span>
          <h2 class="about-section__title">Cómo está construido</h2>
        </div>
        <div class="about-academic__right">
          <p class="about-academic__text">
            Lost Tapes está desarrollado con <strong>Vue 3</strong>, Pinia y Vue Router en el frontend,
            y <strong>Laravel 11</strong> con Sanctum en el backend, desplegado sobre
            infraestructura AWS con CI/CD automático vía GitHub Actions.
          </p>
          <div class="about-team">
            <span class="team-member">Manel</span>
            <span class="team-sep">·</span>
            <span class="team-member">Alex</span>
            <span class="team-sep">·</span>
            <span class="team-member">Maxi</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── SOSTENIBILIDAD ─────────────────────────────────────────── -->
    <section class="about-section" id="sostenibilidad">
      <div class="section-header mb-4">
        <h2 class="about-section__title">Compromiso con la sostenibilidad</h2>
        <p class="about-section__lead">
          En Lost Tapes creemos que la tecnología y la cultura pueden ir de la mano
          con el respeto al medio ambiente y a la sociedad.
        </p>
      </div>

      <div class="row g-4 mb-4">
        <div class="col-12 col-md-4">
          <div class="asg-block">
            <span class="asg-letter">A</span>
            <h4 class="asg-title">Ambiental</h4>
            <ul class="asg-list">
              <li>Distribución 100% digital — sin DVDs ni embalajes físicos.</li>
              <li>Infraestructura cloud dimensionada al uso real, sin servidores ociosos.</li>
              <li>Optimización de imágenes y assets para reducir el ancho de banda.</li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="asg-block">
            <span class="asg-letter">S</span>
            <h4 class="asg-title">Social</h4>
            <ul class="asg-list">
              <li>Accesibilidad web WCAG para personas con necesidades visuales o motoras.</li>
              <li>Preservación del patrimonio cinematográfico olvidado.</li>
              <li>Plataforma abierta: cualquier usuario puede registrarse y participar.</li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="asg-block">
            <span class="asg-letter">G</span>
            <h4 class="asg-title">Gobernanza</h4>
            <ul class="asg-list">
              <li>Código abierto y documentado en GitHub con historial de cambios transparente.</li>
              <li>Autenticación segura con Sanctum y OAuth2.</li>
              <li>Control de roles para que cada usuario acceda solo a lo que le corresponde.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Propuestas de mejora -->
      <div class="mejoras-box">
        <h5 class="mejoras-title">Propuestas de mejora</h5>
        <p class="mejoras-sub">
          Aunque Lost Tapes es un proyecto académico, estas serían las siguientes
          medidas a implementar en producción real:
        </p>
        <div class="row row-cols-1 row-cols-md-2 g-3">
          <div class="col">
            <div class="mejora-item">
              <span class="mejora-arrow">→</span>
              <p><strong>Hosting verde:</strong> migrar a proveedores cloud con certificación de energía 100% renovable.</p>
            </div>
          </div>
          <div class="col">
            <div class="mejora-item">
              <span class="mejora-arrow">→</span>
              <p><strong>Política de privacidad:</strong> aviso legal completo conforme al RGPD y la LSSI.</p>
            </div>
          </div>
          <div class="col">
            <div class="mejora-item">
              <span class="mejora-arrow">→</span>
              <p><strong>Lazy loading de imágenes:</strong> cargar portadas solo cuando entran en el viewport.</p>
            </div>
          </div>
          <div class="col">
            <div class="mejora-item">
              <span class="mejora-arrow">→</span>
              <p><strong>CDN para assets estáticos:</strong> servir imágenes y vídeos desde una red de distribución.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* ── Banner ────────────────────────────────────────────────────── */
.about-banner {
  background: linear-gradient(135deg, #0d0d0d 0%, #1a0505 50%, #0d0d0d 100%);
  padding: 96px 24px 80px;
  text-align: center;
}

.about-banner__inner { max-width: 700px; margin: 0 auto; }

.about-tag {
  display: inline-block;
  font-size: 10px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #c0392b;
  font-weight: 600;
  margin-bottom: 16px;
}

.about-banner__title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(36px, 7vw, 72px);
  font-weight: 900;
  color: #fff;
  line-height: 1.1;
  margin: 0 0 20px;
}

.about-banner__title span { color: #c0392b; }

.about-rule {
  width: 50px;
  height: 2px;
  background: #c0392b;
  margin: 0 auto 20px;
}

.about-banner__sub {
  color: #777;
  font-size: 16px;
  line-height: 1.7;
  margin: 0;
}

/* ── Sections ──────────────────────────────────────────────────── */
.about-section {
  padding: 64px 0;
  border-top: 1px solid var(--page-border);
}

.about-section__title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 700;
  color: var(--page-text);
  margin: 4px 0 8px;
}

.about-section__lead {
  color: var(--page-muted);
  font-size: 15px;
  line-height: 1.7;
  max-width: 600px;
  margin: 0;
}

/* ── Bloques de misión ─────────────────────────────────────────── */
.about-block {
  padding: 0 32px 0 0;
  border-right: 1px solid var(--page-border);
}

.about-block:last-child { border-right: none; padding-right: 0; }
.about-block:not(:first-child) { padding-left: 32px; }

@media (max-width: 767px) {
  .about-block {
    border-right: none;
    border-bottom: 1px solid var(--page-border);
    padding: 0 0 32px 0 !important;
    margin-bottom: 32px;
  }
  .about-block:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
}

.about-num {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 48px;
  font-weight: 900;
  color: #c0392b;
  opacity: 0.25;
  line-height: 1;
  display: block;
  margin-bottom: 8px;
}

.about-block__title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--page-text);
  margin: 0 0 10px;
}

.about-block__text {
  color: var(--page-muted);
  font-size: 14px;
  line-height: 1.75;
  margin: 0;
}

/* ── Stack técnico ─────────────────────────────────────────────── */
.about-academic {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 48px;
  align-items: start;
}

@media (max-width: 767px) {
  .about-academic { grid-template-columns: 1fr; gap: 16px; }
}

.about-academic__left { /* col 1 — solo el título */ }

.about-academic__right {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.about-academic__text {
  color: var(--page-muted);
  font-size: 15px;
  line-height: 1.8;
  margin: 0;
}

.about-team {
  display: flex;
  gap: 12px;
  align-items: center;
}

.team-member {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--page-text);
  letter-spacing: 1px;
}

.team-sep { color: #c0392b; font-weight: 700; }

/* ── ASG ───────────────────────────────────────────────────────── */
.asg-block {
  border-left: 3px solid #c0392b;
  padding-left: 20px;
  height: 100%;
}

.asg-letter {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 40px;
  font-weight: 900;
  color: #c0392b;
  opacity: 0.3;
  display: block;
  line-height: 1;
  margin-bottom: 6px;
}

.asg-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--page-text);
  margin: 0 0 12px;
}

.asg-list {
  color: var(--page-muted);
  font-size: 13px;
  line-height: 1.7;
  padding-left: 16px;
  margin: 0;
}

.asg-list li { margin-bottom: 8px; }
.asg-list li:last-child { margin-bottom: 0; }

/* ── Mejoras ───────────────────────────────────────────────────── */
.mejoras-box {
  background: var(--page-card-bg);
  border: 1px solid var(--page-border);
  border-radius: 6px;
  padding: 28px 32px;
}

.mejoras-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 17px;
  font-weight: 700;
  color: var(--page-text);
  margin: 0 0 6px;
}

.mejoras-sub {
  color: var(--page-muted);
  font-size: 13px;
  margin: 0 0 20px;
}

.mejora-item {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.mejora-arrow {
  color: #c0392b;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
  margin-top: 2px;
}

.mejora-item p {
  color: var(--page-muted);
  font-size: 13px;
  line-height: 1.6;
  margin: 0;
}

.mejora-item p strong { color: var(--page-text); }
</style>
