<template>
  <div>
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
</template>

<script>
export default {
  name: 'About',
  props: {
    msg: String
  }
}
</script>

<style>
</style>
