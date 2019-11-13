<template>
  <div class="about">
    <h1>About me</h1>
    <p>
      I'm a software engineer.<br/>
    </p>
    <h2>Habit</h2>
    <ul>
      <li>Create something I want.</li>
      <li>Jogging.</li>
      <li>Listening to Podcast.</li>
    </ul>
    <h2>Portfolio</h2>
    <ul>
      <li>copu: <a href="https://addons.mozilla.org/en-US/firefox/addon/copu/">Copy page url – Get this Extension for 🦊 Firefox (en-US)</a></li>
      <li>WebScreen: <a href="https://github.com/ymatzki/WebScreen"> macOS screen saver displays a web page.</a></li>
    </ul>
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
