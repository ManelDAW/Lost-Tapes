<template>
  <body>

    <!-- 
    <div class="errores-php text-center mt-3">
        <?php echo $erroresHtml; ?>
        <?php
        if (isset($_SESSION['estado_envio'])) {
            echo "<p style='color:green;'>" . $_SESSION['estado_envio'] . "</p>";
            unset($_SESSION['estado_envio']);
        }
        ?>
    </div>Mensajes generales de errores o éxito -->

    <main class="container mt-5 pt-5">
        <section class="contacto">
            <h1>Contáctanos</h1>
            <p>¿Tienes alguna duda o comentario? Envíanos un mensaje y te responderemos pronto.</p>

            <form action="contacto.php" method="post" class="form-contacto">
                <label for="nombre">Nombre completo:</label>
                <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" value="<?php echo htmlspecialchars($nombre); ?>" />

                <label for="email">Correo electrónico:</label>
                <input type="email" id="email" name="email" placeholder="tu@correo.com" value="<?php echo htmlspecialchars($email); ?>" />

                <label for="asunto">Asunto:</label>
                <input type="text" id="asunto" name="asunto" placeholder="Motivo del mensaje" value="<?php echo htmlspecialchars($asunto); ?>" />

                <label for="mensaje">Mensaje:</label>
                <textarea id="mensaje" name="mensaje" rows="5" placeholder="Escribe tu mensaje aquí..."></textarea>

                <button type="submit">Enviar</button>
            </form>
        </section>
    </main>
</body>
<!-- <script src="./js/validacion.js"></script> -->
</template>

<script setup>
    
</script>

<style scoped>
.contacto {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  background-color: #222;
  border-radius: 8px;
}

.contacto h1 {
  text-align: center;
  color: #fff;
}

.form-contacto {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-contacto label {
  font-weight: bold;
  color: #eee;
}

.form-contacto input,
.form-contacto textarea {
  padding: 10px;
  border: 1px solid #444;
  background: #333;
  color: #fff;
  border-radius: 6px;
}

.form-contacto button {
  padding: 12px;
  background: #ff6600;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>