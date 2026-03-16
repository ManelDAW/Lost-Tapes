<script setup>

</script>

<template>
<main class="container mt-5 pt-5">
  <section class="text-center mb-4">
    <h2 class="section-title">Productos — Lost Media</h2>
    <p class="lead">Películas, archivos, música y otros objetos del underground. Filtra y explora nuestro catálogo.</p>
  </section>

  <!-- Grid de productos -->
  <div class="row g-4">
    <!--<?php if (!empty($peliculas)): ?>
      <?php foreach ($peliculas as $p): ?>
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card pelicula-card h-100">
            <?php
              // Determinar ruta de imagen:
              // - si el JSON proporciona 'imagen' usamos esa ruta (archivo único)
              // - si proporciona 'carpeta' intentamos cargar '1.jpg' dentro de esa carpeta
              // - si no, usamos una imagen por defecto
              if (isset($p['imagen']) && $p['imagen']) {
                  $imgPath = $p['imagen'];
              } elseif (isset($p['carpeta']) && $p['carpeta']) {
                  $imgPath = $p['carpeta'] . '1.jpg';
              } else {
                  $imgPath = './public/img/peliculas/default.jpg';
              }
              // Normalizar rutas que vienen con './' y eliminar dobles slashes
              $imgPath = str_replace('./', '', $imgPath);
              $imgPath = preg_replace('#/+#', '/', $imgPath);
            ?>
            <img src="/<?php echo htmlspecialchars($imgPath); ?>" class="card-img-top" alt="<?php echo htmlspecialchars($p['nombre']); ?>">
            <div class="card-body">
              <div class="d-flex justify-content-between mb-2">
                <h5 class="card-title"><?php echo htmlspecialchars($p['nombre']); ?></h5>
                <span class="duracion"><?php echo htmlspecialchars($p['duracion'] ?? '—'); ?>'</span>
              </div>
              <p class="card-text"><?php echo htmlspecialchars($p['descripcion']); ?></p>
              <a href="pelicula.php?id=<?php echo urlencode($p['id']); ?>" class="btn btn-dark">Ver detalle</a>
            </div>
          </div>
        </div>-->
  </div>
</main>
</template>
