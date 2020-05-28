<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
body {
  font-family: 'M PLUS Rounded 1c', sans-serif;
  background-image: url('./assets/background3.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: auto;
  text-align: center;
  color: white;
}

.semi-transparent {
  background: rgba(255,255,255, 0.2);
  padding: 5%;
}
</style>
