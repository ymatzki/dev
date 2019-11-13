<template>
  <div id="app" class="font row m-0">
    <div class="col-2 bg-light sidebar">
      <nav>
        <div class="sidebar-sticky">
          <img src="image.jpg" class="rounded-circle img-thumbnail">
          <div class="pt-5">
          <ul>
            <li><a href="/">About me</a></li>
          </ul>
          </div>
        </div>
      </nav>
    </div>
    <div class="col-10 px-0">
      <main role="main">
        <div class="header"><Header /></div>
        <div class="content"><About /></div>
        <div class="footer"><Footer /></div>
      </main>
    </div>
  </div>
</template>

<script>
import About from './components/About.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    About,
    Header,
    Footer
  }
}
</script>

<style>
  .font {
    font-family: "Times New Roman", Times, serif;
  }

  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    padding: 48px;
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
  }

  .sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: .5rem;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .toc {

  }

  .header {
  }

  .content{
    padding: 24px;
  }

  .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 60px;
      background-color: #f5f5f5;
      box-shadow: inset 0 1px 0 rgba(0, 0, 0, .1);
  }
</style>
