<template>
  <footer class="footer">
    <div class="footer-contenedor">

      <div class="footer-logo">
        <img src="../assets/img/Logo_Tapes.png" alt="Logo Tapes">
        <p>Lost Tapes</p>
      </div>

      <div class="footer-links">
        <h4>Explorar</h4>
        <router-link to="/">Home</router-link>
        <router-link to="/productos">Productos</router-link>
        <router-link to="/contacto">Contacto</router-link>
        <router-link to="/vender">Vender</router-link>
      </div>

      <div class="footer-info">
        <h4>Información</h4>
        <a href="#">Política de privacidad</a>
        <a href="#">Términos y condiciones</a>
        <a href="#">Aviso legal</a>
      </div>

      <div class="footer-social">
        <h4>Síguenos</h4>
        <a href="#">Instagram</a>
        <a href="#">Twitter</a>
        <a href="#">YouTube</a>
      </div>

    </div>

    <hr class="footer-line">

    <p class="footer-copy">
      ©Tapes Films — Archivo digital y mixtapes ocultas del underground.
    </p>
  </footer>
</template>

<script setup>
// Aquí puedes importar componentes o lógica si la necesitas en el futuro
</script>

<style scoped>
.footer {
  margin-top: 60px;
  background: black;
  color: #ffffff;
  padding: 40px 20px;
  font-family: 'Inter', sans-serif;
}

.footer-contenedor {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
}

.footer-logo img {
  width: 80px;
  margin-bottom: 10px;
}

.footer a {
  display: block;
  margin-bottom: 6px;
  color: #948d8d;
  text-decoration: none;
  transition: 0.3s;
}

.footer a:hover {
  color: #ff6600;
}

.footer-line {
  margin: 35px auto 20px;
  width: 80%;
  border-top: 1px solid #333;
}
</style>