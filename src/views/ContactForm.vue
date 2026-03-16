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

</style>