<template>
  <div id="app">
    <header>
      <h1>Outlook Add-in</h1>
      <!-- Add any navigation or header content here -->
    </header>

    <router-view></router-view>

    <footer>
      <!-- Add any footer content here -->
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

header {
  background-color: #41b883;
  padding: 20px;
  color: white;
}

footer {
  margin-top: 20px;
  padding: 10px;
  background-color: #ecf0f1;
}
</style>
