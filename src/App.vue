<script setup>
import FooterApp from './components/FooterApp.vue'
</script>

<template>
  <header>

    <div class="wrapper">

      <nav>
        <RouterLink to="/"> Home </RouterLink>
        <RouterLink to="/contacto">Contacto </RouterLink>
        <RouterLink to="/productos">Productos </RouterLink>
        <RouterLink to="/vender">Vender </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
      <div class="wrapper">

      <nav>
        <FooterApp/>       
        <!-- 
        <RouterLink to="/"> Home </RouterLink>
        <RouterLink to="/employees">Contacto </RouterLink>
        <RouterLink to="/new-client">Productos </RouterLink>
        <RouterLink to="/about">Sell </RouterLink> -->
      </nav>
    </div>
</template>

<style scoped>

</style>
