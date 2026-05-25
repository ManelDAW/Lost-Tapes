<template>
  <main class="about-wrapper">
    <div class="about-content">
      <h1 class="about-title">Sobre Lost Tapes</h1>
      <p class="about-lead">
        Lost Tapes es una tienda especializada en cine de culto: películas que el tiempo ha enterrado
        y que merecen ser rescatadas. Nuestro catálogo reúne joyas del cine de autor, obras olvidadas
        y películas que desafiaron las convenciones de su época.
      </p>

      <div class="about-cards">
        <div class="about-card">
          <span class="card-icon">🎬</span>
          <h2>Nuestra misión</h2>
          <p>Recuperar y difundir películas que han quedado fuera de los circuitos comerciales,
            dándoles la visibilidad que merecen entre los amantes del cine.</p>
        </div>

        <div class="about-card">
          <span class="card-icon">🎞️</span>
          <h2>¿Qué encontrarás?</h2>
          <p>Cine japonés de los años 60, nuevas olas europeas, cine de autor de Europa del Este
            y muchas otras obras que no encontrarás en las grandes plataformas.</p>
        </div>

        <div class="about-card">
          <span class="card-icon">💬</span>
          <h2>La comunidad</h2>
          <p>Regístrate para dejar comentarios, dar me gusta a tus películas favoritas
            y estar al tanto de las nuevas incorporaciones al catálogo.</p>
        </div>
      </div>

      <div class="about-footer">
        <h2>Proyecto académico</h2>
        <p>
          Lost Tapes es el proyecto intermodular del ciclo de
          <strong>Desarrollo de Aplicaciones Web (DAW)</strong>.
          Desarrollado con Vue 3, Pinia, Vue Router y Laravel.
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.about-wrapper {
  max-width: 960px;
  margin: 0 auto;
  padding: 60px 20px 80px;
}

.about-title {
  font-size: 2.4rem;
  font-weight: 800;
  margin-bottom: 20px;
  color: var(--page-text);
}

.about-lead {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--page-muted);
  max-width: 700px;
  margin-bottom: 56px;
}

.about-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 56px;
}

.about-card {
  background: var(--page-card-bg);
  border: 1px solid var(--page-border);
  border-radius: 8px;
  padding: 28px 24px;
}

.card-icon {
  font-size: 1.8rem;
  display: block;
  margin-bottom: 14px;
}

.about-card h2 {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 10px 0;
  color: var(--page-text);
}

.about-card p {
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--page-muted);
  margin: 0;
}

.about-footer {
  border-top: 1px solid var(--page-border);
  padding-top: 40px;
}

.about-footer h2 {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: var(--page-text);
}

.about-footer p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--page-muted);
}

.about-footer strong {
  color: var(--page-text);
}

@media (max-width: 700px) {
  .about-cards { grid-template-columns: 1fr; }
  .about-title { font-size: 1.8rem; }
}
</style>
