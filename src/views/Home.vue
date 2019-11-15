<template>
  <div>
    <div class="header"><Header /></div>
    <div class="content"><About /></div>
  </div>
</template>

<script>
  import Header from '../components/Header.vue'
  import About from '../components/About.vue'

  export default {
    name: 'app',
    components: {
      Header,
      About
    }
  }
</script>

<style>
</style>
