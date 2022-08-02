<script setup lang="ts">
import AppContainer from './components/AppContainer.vue'
</script>

<template>
  <div id="app">
    <h1>🤦‍♀️🎉💁‍♂️</h1>
    <AppContainer />
  </div>
</template>

<style>
html,
body {
  margin: 0;
  height: 100%;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #39143e;
  min-height: 100%;
  color: #fff;
  padding-top: 60px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

h1 {
  font-size: 60px;
  letter-spacing: 10px;
  animation: party 2s infinite step-start;
}

@keyframes party {
  0% {
    filter: hue-rotate(0);
  }

  20% {
    filter: hue-rotate(80deg);
  }

  40% {
    filter: hue-rotate(200deg);
  }

  60% {
    filter: hue-rotate(310deg);
  }

  80% {
    filter: hue-rotate(630deg);
  }
}
</style>
